import Head from 'next/head';
import { getRouteSeo } from '../../lib/seo/routeSeo';
import { getConfiguredSiteUrl } from '../../lib/seo/siteUrl';

interface PageSeoProps {
  readonly pathname: string;
}

const SITE_NAME = 'Atlas Studio';
const SOCIAL_IMAGE_PATH = '/og-image.png';

function serializeStructuredData(value: object): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

/** Supplies canonical, social, crawler, and structured metadata for the current route. */
export default function PageSeo({ pathname }: PageSeoProps) {
  const config = getRouteSeo(pathname);
  const siteUrl = getConfiguredSiteUrl();
  const isPublicHome = pathname === '/' && !config.noIndex;
  const canonicalUrl = isPublicHome && siteUrl ? siteUrl : undefined;
  const socialImageUrl = siteUrl ? `${siteUrl}${SOCIAL_IMAGE_PATH}` : SOCIAL_IMAGE_PATH;
  const robotsContent = config.noIndex
    ? 'noindex, nofollow, noarchive'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const structuredData = isPublicHome && siteUrl
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            description: config.description,
            name: SITE_NAME,
            url: siteUrl,
          },
          {
            '@type': 'WebApplication',
            '@id': `${siteUrl}/#application`,
            applicationCategory: 'MultimediaApplication',
            browserRequirements: 'Requires JavaScript and a modern web browser.',
            description: config.description,
            image: `${siteUrl}${SOCIAL_IMAGE_PATH}`,
            name: SITE_NAME,
            operatingSystem: 'Web',
            url: siteUrl,
          },
        ],
      }
    : undefined;

  return (
    <Head>
      <title key="title">{config.title}</title>
      <meta content={config.description} key="description" name="description" />
      <meta content={robotsContent} key="robots" name="robots" />
      <meta content={robotsContent} key="googlebot" name="googlebot" />
      {canonicalUrl && <link href={canonicalUrl} key="canonical" rel="canonical" />}

      <meta content={config.description} key="og:description" property="og:description" />
      <meta content={socialImageUrl} key="og:image" property="og:image" />
      <meta content="630" key="og:image:height" property="og:image:height" />
      <meta content="Atlas Studio AI comic localization editor" key="og:image:alt" property="og:image:alt" />
      <meta content="1200" key="og:image:width" property="og:image:width" />
      <meta content="en_US" key="og:locale" property="og:locale" />
      <meta content={SITE_NAME} key="og:site_name" property="og:site_name" />
      <meta content={config.title} key="og:title" property="og:title" />
      <meta content="website" key="og:type" property="og:type" />
      {canonicalUrl && <meta content={canonicalUrl} key="og:url" property="og:url" />}

      <meta content="summary_large_image" key="twitter:card" name="twitter:card" />
      <meta content={config.description} key="twitter:description" name="twitter:description" />
      <meta content={socialImageUrl} key="twitter:image" name="twitter:image" />
      <meta content="Atlas Studio AI comic localization editor" key="twitter:image:alt" name="twitter:image:alt" />
      <meta content={config.title} key="twitter:title" name="twitter:title" />

      {structuredData && (
        <script
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }}
          key="atlas-structured-data"
          type="application/ld+json"
        />
      )}
    </Head>
  );
}
