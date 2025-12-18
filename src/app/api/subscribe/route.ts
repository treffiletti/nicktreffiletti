import { NextResponse } from 'next/server';

const PLATFORM = process.env.NEWSLETTER_PLATFORM || 'beehiiv';
const BEEHIIV_PUB_ID = process.env.BEEHIIV_PUBLICATION_ID!;
const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY!;
const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY || '';

const isEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e || '');

export async function POST(req: Request) {
  try {
    const { email, utm_source, utm_medium, utm_campaign } = await req.json();
    if (!isEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }

    if (PLATFORM === 'beehiiv') {
      const res = await fetch(
        `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${BEEHIIV_API_KEY}`,
          },
          body: JSON.stringify({
            email,
            reactivate_existing: true,
            send_welcome_email: true,
            utm_source: utm_source || 'site',
            utm_medium: utm_medium || 'cta',
            utm_campaign: utm_campaign || 'newsletter-signup',
          }),
          cache: 'no-store',
        },
      );
      if (!res.ok) {
        const text = await res.text();
        return NextResponse.json({ ok: false, error: text }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }

    if (PLATFORM === 'buttondown') {
      const res = await fetch('https://api.buttondown.email/v1/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${BUTTONDOWN_API_KEY}`,
        },
        body: JSON.stringify({ email }),
        cache: 'no-store',
      });
      if (!res.ok) {
        const text = await res.text();
        console.error('Beehiiv error:', text);
        return NextResponse.json({ ok: false, error: text }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, error: 'Unsupported platform' }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 });
  }
}
