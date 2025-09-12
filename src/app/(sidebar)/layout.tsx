import { SidebarLayout } from '@/components/sidebar-layout';
import { getModules } from '@/data/articles';
import type React from 'react';

export default function SidebarGroupLayout({ children }: { children: React.ReactNode }) {
  return <SidebarLayout modules={getModules()}>{children}</SidebarLayout>;
}
