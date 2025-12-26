import Link from "next/link";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-xs">
        <div className="flex justify-center">
          <Link href="/" aria-label="Nick Treffiletti">
            <Image
              src="/images/logo-v2-trans.jpg"
              alt="Nick Treffiletti"
              width={60}
              height={60}
              className="rounded-md"
            />
          </Link>
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
