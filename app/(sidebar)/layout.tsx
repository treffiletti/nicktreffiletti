import { SidebarLayout } from "@/components/sidebar-layout";
import { getModules } from "@/data/lessons";
import { Navbar } from '@/components/navbar'
import { Logo } from '@/components/logo'
import Link from 'next/link'
import type React from "react";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      
      <SidebarLayout modules={getModules()}>{children}</SidebarLayout>
    </>
  );
}
