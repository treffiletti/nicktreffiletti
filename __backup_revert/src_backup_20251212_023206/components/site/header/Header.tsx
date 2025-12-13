'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NAV = [
  { href: '/articles', label: 'Articles' },
  { href: '/library', label: 'Library' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
  { href: '/now', label: 'Now' },
  { href: '/subscribe', label: 'Subscribe' },
];

function NavItem({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`text-sm/5 transition ${
          isActive
            ? 'text-cyan-600 dark:text-cyan-400 font-medium'
            : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
        }`}
      >
        {children}
      </Link>
    </li>
  );
}

function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10 lg:hidden"
      onClick={onClick}
      aria-expanded="false"
      aria-label="Open navigation"
    >
      <span className="sr-only">Open navigation</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
  );
}

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      html.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  return (
    <button
      type="button"
      className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <span className="sr-only">Toggle dark mode</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={[
        'fixed inset-x-0 top-0 z-50',
        'border-b border-slate-200/70 bg-white/70 backdrop-blur',
        'dark:border-white/10 dark:bg-black/40',
        'transition-colors duration-200',
        scrolled ? 'shadow-sm' : '',
      ].join(' ')}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <MobileMenuButton onClick={() => setMobileMenuOpen(true)} />
          <Link href="/" className="font-semibold tracking-tight text-slate-900 dark:text-white">
            NT<span className="sr-only"> — Nick Treffiletti</span>
          </Link>
        </div>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm">
            {NAV.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                isActive={pathname?.startsWith(item.href) || false}
              >
                {item.label}
              </NavItem>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10"
            onClick={() => console.log('Search clicked')}
            aria-label="Search"
          >
            <span className="sr-only">Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>

          <ThemeToggle />

          <Link
            href="/subscribe"
            className="rounded-md bg-slate-900 px-3.5 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300 dark:focus-visible:outline-slate-400"
          >
            Subscribe
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-white/80 backdrop-blur-sm transition-opacity duration-200 dark:bg-black/80 ${
          mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      >
        <div className="fixed inset-0" onClick={() => setMobileMenuOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white p-6 shadow-lg dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="font-semibold tracking-tight text-slate-900 dark:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Nick Treffiletti
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="mt-6">
            <ul className="space-y-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-base font-medium ${
                      pathname?.startsWith(item.href)
                        ? 'bg-slate-100 text-cyan-600 dark:bg-white/10 dark:text-cyan-400'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
