import type { IconType } from 'react-icons';
import { LuLayoutDashboard, LuPanelsTopLeft } from 'react-icons/lu';

export interface NavigationItem {
  readonly href: string;
  readonly label: string;
  readonly icon: IconType;
}

export const navigationItems: readonly NavigationItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LuLayoutDashboard },
  { href: '/dashboard/images', label: 'Image translator', icon: LuPanelsTopLeft },
];

export function isActiveNavigationItem(pathname: string, href: string): boolean {
  if (href === '/dashboard') {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
