// Provision Vercel project, env var, domains, redirects, and GoDaddy DNS (optional).
// Requires: @vercel/sdk (installed by the workflow)

import { Vercel } from '@vercel/sdk';

const token = process.env.VERCEL_TOKEN;
if (!token) throw new Error('VERCEL_TOKEN missing');

const teamId = process.env.VERCEL_TEAM_ID || undefined;
const projectName = process.env.PROJECT_NAME || 'nick-site';
const primaryHost = (process.env.PRIMARY_HOST || '').trim();
if (!primaryHost) throw new Error('PRIMARY_HOST missing');

const redirectHosts = (process.env.REDIRECT_HOSTS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const gdKey = process.env.GODADDY_KEY;
const gdSecret = process.env.GODADDY_SECRET;
const gdDomains = (process.env.GODADDY_DOMAINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const apexIp = (process.env.APEX_IP || '76.76.21.21').trim();
const cnameTarget = (process.env.CNAME_TARGET || 'cname.vercel-dns.com').trim();

const vercel = new Vercel({ bearerToken: token, teamId });

// Helpers
async function ensureProject(name) {
  try {
    const p = await vercel.projects.getProject({ idOrName: name });
    return p;
  } catch {
    const p = await vercel.projects.createProject({
      requestBody: { name, framework: 'nextjs' },
    }); // creates project only; linking a repo happens in the UI/integration
    return p;
  }
}

async function setEnv(idOrName, key, value) {
  await vercel.projects.createEnv({
    idOrName,
    requestBody: [
      { key, value, type: 'plain', target: ['production'] },
    ],
    query: { upsert: true },
  });
}

async function addDomain(idOrName, domain) {
  try {
    await vercel.projects.addProjectDomain({
      idOrName,
      requestBody: { name: domain },
    });
    console.log('Added domain:', domain);
  } catch (e) {
    console.log('addDomain skipped/failed for', domain, '-', e?.message);
  }
}

async function setRedirect(idOrName, domain, destination) {
  try {
    await vercel.projects.updateProjectDomain({
      idOrName,
      domain,
      requestBody: { redirect: destination, redirectStatusCode: 301 },
    });
    console.log('Redirect set:', domain, '→', destination);
  } catch (e) {
    console.log('setRedirect failed for', domain, '-', e?.message);
  }
}

async function gdUpsert(domain, type, name, data, ttl = 3600) {
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
  if (!(gdKey && gdSecret && gdDomains.length)) {
    console.log('GoDaddy creds or domains not provided; skipping DNS automation.');
    console.log('Manual DNS: apex A ->', apexIp, ' | www CNAME ->', cnameTarget);
    return;
  }
  for (const d of gdDomains) {
    await gdUpsert(d, 'A', '@', apexIp);
    await gdUpsert(d, 'CNAME', 'www', cnameTarget);
    console.log('DNS updated in GoDaddy for', d);
  }
}

(async () => {
  const project = await ensureProject(projectName);
  console.log('Project ready:', project?.name);

  await setEnv(projectName, 'SITE_URL', `https://${primaryHost}`);
  console.log('SITE_URL set to https://' + primaryHost);

  // Domains
  await addDomain(projectName, primaryHost);
  for (const host of redirectHosts) await addDomain(projectName, host);

  // Redirects
  for (const host of redirectHosts) {
    if (host !== primaryHost) {
      await setRedirect(projectName, host, `https://${primaryHost}`);
    }
  }

  // DNS
  await configureGoDaddy();

  console.log('Done. Next: ensure the GitHub repo is linked in Vercel for auto-deploys.');
})();
