import { navigationConfig, getNavigationItems, isRouteActive, type NavigationItem } from '../src/lib/navigation';

// Type checks
const _items: readonly NavigationItem[] = getNavigationItems();
const _active: boolean = isRouteActive('/projects/123', '/projects');
const _label: string = navigationConfig[0].label;

console.log("Navigation types validated");
