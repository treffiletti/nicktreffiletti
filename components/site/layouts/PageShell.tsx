import React from 'react';

export default function PageShell({
  left,
  right,
  children,
}: {
  left?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[16rem,minmax(0,1fr),14rem] gap-8 py-10">
      <aside className="hidden lg:block">{left}</aside>
      <section className="min-w-0">{children}</section>
      <aside className="hidden xl:block">{right}</aside>
    </div>
  );
}
