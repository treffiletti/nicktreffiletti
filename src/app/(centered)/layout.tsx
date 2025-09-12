import { Navbar } from '@/components/navbar'
import { Logo } from '@/components/logo'
import Link from 'next/link'

export default function CenteredLayout({ children }: { children: React.ReactNode }) {
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
      
      <main className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>
    </>
  );
}
