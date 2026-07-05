export interface NavigationItem {
  readonly label: string;
  readonly path: string;
  readonly icon?: string;
  readonly requiredPermission?: string;
  readonly children?: readonly NavigationItem[];
}

export const navigationConfig: readonly NavigationItem[] = [
  { label: 'Dashboard', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Settings', path: '/settings' },
];

export const getNavigationItems = (): readonly NavigationItem[] => [...navigationConfig];

export const isRouteActive = (currentPath: string, targetPath: string): boolean => {
  if (targetPath === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(targetPath);
};
