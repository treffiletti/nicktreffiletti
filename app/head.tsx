// app/head.tsx
export default function Head() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nick Treffiletti",
    alternateName: "Nicholas Treffiletti",
    url: "https://www.nicktreffiletti.com",
    sameAs: ["https://linkedin.com/in/nicktreffiletti", "https://github.com/treffiletti", "https://medium.com/@newyorknick"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
