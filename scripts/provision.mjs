// scripts/provision.mjs
// Provision Vercel project, env var, domains, redirects, and GoDaddy DNS (optional).

const token = process.env.VERCEL_TOKEN;
if (!token) throw new Error('VERCEL_TOKEN missing');

const teamId = process.env.VERCEL_TEAM_ID || ''; // empty means personal scope
const projectName = process.env.PROJECT_NAME || 'nick-site';
const primaryHost = (process.env.PRIMARY_HOST || '').trim();
if (!primaryHost) throw new Error('PRIMARY_HOST missing');

const redirectHosts = (process.env.REDIRECT_HOSTS || '')
  .split(',').map(s => s.trim()).filter(Boolean);

const gdKey = process.env.GODADDY_KEY || '';
const gdSecret = process.env.GODADDY_SECRET || '';
const gdDomains = (process.env.GODADDY_DOMAINS || '')
  .split(',').map(s => s.trim()).filter(Boolean);

const apexIp = (process.env.APEX_IP || '76.76.21.21').trim();
const cnameTarget = (process.env.CNAME_TARGET || 'cname.vercel-dns.com').trim();

const API = 'https://api.vercel.com';
const tv = teamId ? `teamId=${encodeURIComponent(teamId)}` : '';

async function vfetch(path, init={}) {
  const sep = path.includes('?') ? '&' : '?';
  const url = `${API}${path}${tv ? sep + tv : ''}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${init.method || 'GET'} ${path} -> ${res.status} ${text}`);
  }
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : res.text();
}

// --- Vercel helpers (REST) ---
async function getProject(name) {
  try {
    return await vfetch(`/v9/projects/${encodeURIComponent(name)}`);
  } catch (e) {
    if (String(e.message).includes('404')) return null;
    throw e;
  }
}

async function createProject(name) {
  return vfetch(`/v10/projects`, {
    method: 'POST',
    body: JSON.stringify({ name, framework: 'nextjs' }),
  });
}

async function ensureProject(name) {
  let p = await getProject(name);
  if (!p) p = await createProject(name);
  return p;
}

async function upsertEnv(idOrName, key, value) {
  // POST /v10/projects/:idOrName/env?upsert=true
  await vfetch(
    `/v10/projects/${encodeURIComponent(idOrName)}/env?upsert=true`,
    {
      method: 'POST',
      body: JSON.stringify([
        { key, value, type: 'plain', target: ['production'] },
      ]),
    }
  );
}

async function addDomain(idOrName, domain) {
  // POST /v10/projects/:idOrName/domains
  await vfetch(
    `/v10/projects/${encodeURIComponent(idOrName)}/domains`,
    { method: 'POST', body: JSON.stringify({ name: domain }) }
  );
}

async function setRedirect(idOrName, domain, destination) {
  // PATCH /v10/projects/:idOrName/domains/:domain
  await vfetch(
    `/v10/projects/${encodeURIComponent(idOrName)}/domains/${encodeURIComponent(domain)}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ redirect: destination, redirectStatusCode: 301 }),
    }
  );
}

// --- GoDaddy DNS (optional) ---
async function gdUpsert(domain, type, name, data, ttl = 3600) {
  if (!(gdKey && gdSecret)) throw new Error('GoDaddy creds missing');
  const url = `https://api.godaddy.com/v1/domains/${domain}/records/${type}/${encodeURIComponent(name)}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `sso-key ${gdKey}:${gdSecret}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{ data, name, ttl, type }]),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GoDaddy ${type} ${name} -> ${data} failed: ${res.status} ${text}`);
  }
}

async function configureGoDaddy() {
  if (!gdDomains.length) {
    console.log('GoDaddy DNS automation skipped. Manual DNS:');
    console.log('  apex (@) A ->', apexIp);
    console.log('  www CNAME ->', cnameTarget);
    return;
  }
  for (const d of gdDomains) {
    await gdUpsert(d, 'A', '@', apexIp);
    await gdUpsert(d, 'CNAME', 'www', cnameTarget);
    console.log('DNS updated in GoDaddy for', d);
  }
}

// --- Main ---
(async () => {
  const project = await ensureProject(projectName);
  console.log('Project ready:', project?.name || projectName);

  await upsertEnv(projectName, 'SITE_URL', `https://${primaryHost}`);
  console.log('SITE_URL set to https://' + primaryHost);

  // Domains
  await addDomain(projectName, primaryHost);
  for (const host of redirectHosts) await addDomain(projectName, host);

  // Redirects
  for (const host of redirectHosts) {
    if (host !== primaryHost) {
      await setRedirect(projectName, host, `https://${primaryHost}`);
      console.log('Redirect set:', host, '→', `https://${primaryHost}`);
    }
  }

  // DNS (optional)
  await configureGoDaddy();

  console.log('Done. Next: link the GitHub repo in Vercel for auto-deploys (once).');
})();
