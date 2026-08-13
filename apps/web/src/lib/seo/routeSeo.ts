export interface RouteSeoConfig {
  readonly description: string;
  readonly noIndex: boolean;
  readonly title: string;
}

const PRIVATE_DESCRIPTION = 'A private Atlas Studio workspace for AI-assisted comic localization.';

const privateRoute = (title: string, description = PRIVATE_DESCRIPTION): RouteSeoConfig => ({
  description,
  noIndex: true,
  title,
});

const routeSeo: Readonly<Record<string, RouteSeoConfig>> = {
  '/': {
    description:
      'Translate manga, comics, and webtoons with AI-powered text detection, clean inpainting, editable lettering, and instant image downloads.',
    noIndex: false,
    title: 'Image Translation | Atlas Studio',
  },
  '/404': privateRoute('Page Not Found | Atlas Studio'),
  '/500': privateRoute('Server Error | Atlas Studio'),
  '/auth/login': privateRoute('Sign In | Atlas Studio', 'Sign in to your Atlas Studio localization workspace.'),
  '/auth/register': privateRoute(
    'Create an Account | Atlas Studio',
    'Create an Atlas Studio account and start localizing comic images with AI.',
  ),
  '/privacy-policy': {
    description: 'Learn how Atlas Studio handles account information, uploaded images, AI processing, and browser storage.',
    noIndex: false,
    title: 'Privacy Policy | Atlas Studio',
  },
  '/terms-and-conditions': {
    description: 'Read the terms that apply when accessing and using Atlas Studio image translation tools.',
    noIndex: false,
    title: 'Terms and Conditions | Atlas Studio',
  },
  '/cookie-policy': {
    description: 'Learn how Atlas Studio uses local browser storage and whether the website sets cookies.',
    noIndex: false,
    title: 'Cookie Policy | Atlas Studio',
  },
  '/dashboard': privateRoute('Dashboard | Atlas Studio'),
  '/dashboard/ai-jobs': privateRoute('AI Jobs | Atlas Studio'),
  '/dashboard/export': privateRoute('Export | Atlas Studio'),
  '/dashboard/images': privateRoute(
    'Image Translation Editor | Atlas Studio',
    'A private editor for translating, inpainting, lettering, and downloading comic images.',
  ),
  '/dashboard/library': privateRoute('Library | Atlas Studio'),
  '/dashboard/projects': privateRoute('Projects | Atlas Studio'),
  '/dashboard/projects/[id]': privateRoute('Project Details | Atlas Studio'),
  '/dashboard/settings': privateRoute('Settings | Atlas Studio'),
  '/dashboard/translate': privateRoute('Translation Workbench | Atlas Studio'),
  '/editor/[id]': privateRoute('Image Editor | Atlas Studio'),
};

const fallbackSeo = privateRoute('Atlas Studio');

/** Returns deterministic metadata for every Pages Router pathname. */
export function getRouteSeo(pathname: string): RouteSeoConfig {
  return routeSeo[pathname] || fallbackSeo;
}
