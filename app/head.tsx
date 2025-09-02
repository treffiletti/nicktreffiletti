// app/head.tsx
import { SITE_URL } from '@/lib/site';

export default function Head() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Nick Treffiletti',
    alternateName: 'Nicholas Treffiletti',
    url: SITE_URL,
    sameAs: [
      'https://linkedin.com/in/nicktreffiletti',
      'https://github.com/treffiletti',
      'https://medium.com/@newyorknick',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
