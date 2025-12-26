import type React from "react";
import { Navbar } from "./navbar";
import Link from "next/link";
import Image from "next/image";

export function CenteredPageLayout({
  breadcrumbs,
  children,
}: {
  breadcrumbs: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="pb-30">
      <Navbar>
        <Link href="/" className="flex items-center gap-x-3 shrink-0">
          <Image
            src="/images/logo-v2-trans.jpg"
            alt="Nick Treffiletti"
            width={40}
            height={40}
            className="rounded-md"
          />
        </Link>
        <div className="min-w-0">{breadcrumbs}</div>
      </Navbar>
      <div className="px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">{children}</div>
      </div>
    </div>
  );
}
