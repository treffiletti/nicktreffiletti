import { Navbar } from '@/components/navbar';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <Navbar>
        <Link href="/" className="flex items-center gap-x-3">
          <Logo className="h-8 w-auto" />
          <span className="text-lg font-semibold text-gray-950 dark:text-white">
            Nick Treffiletti
          </span>
        </Link>
      </Navbar>

      <main className="relative min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="relative px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-8">
                <div className="inline-flex items-center gap-x-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Platform Architecture
                </div>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Navigate uncertainty and make choices aligned with your values
              </h1>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                A comprehensive journey that helps you navigate uncertainty and make choices aligned
                with your values and goals.
              </p>

              <div className="mt-8 flex items-center justify-center gap-x-6 text-sm">
                <div className="flex items-center gap-x-2">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>4 modules</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>20 lessons</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>3 hr 26 min</span>
                </div>
              </div>

              <div className="mt-10">
                <Link
                  href="/articles"
                  className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Read the articles
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
