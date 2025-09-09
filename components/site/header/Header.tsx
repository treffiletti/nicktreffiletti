'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { href: '/articles', label: 'Articles' },
  { href: '/library', label: 'Library' },
  { href: '/about', label: 'About' },
  { href: '/now', label: 'Now' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:border-white/10 dark:bg-black/40">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <button
            className="md:hidden rounded-md p-2 hover:bg-slate-100 dark:hover:bg-white/10"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
          <Link href="/" className="font-semibold tracking-tight">
            NT<span className="sr-only"> — Nick Treffiletti</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {NAV.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? 'text-cyan-600 dark:text-cyan-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            className="hidden rounded-md border border-slate-200 px-2.5 py-1 text-sm dark:border-white/10 md:inline-block"
            onClick={() => console.log('search')}
          >
            Search
          </button>
          <button
            aria-label="Toggle theme"
            className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-white/10"
            onClick={() => document.documentElement.classList.toggle('dark')}
          >
            ◐
          </button>
          <Link
            href="/subscribe"
            className="rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white dark:bg-white dark:text-slate-900"
          >
            Subscribe
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <nav className="fixed left-0 top-0 z-50 h-full w-80 bg-white p-6 shadow-lg dark:bg-black">
            <div className="mb-4 flex items-center justify-between">
              <Link href="/" onClick={() => setOpen(false)} className="font-semibold">
                NT
              </Link>
              <button
                className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-white/10"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-2 text-base text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
