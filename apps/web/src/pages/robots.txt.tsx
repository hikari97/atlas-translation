import type { GetServerSideProps } from 'next';
import { getRequestSiteUrl } from '../lib/seo/siteUrl';

export default function RobotsTxtPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const siteUrl = getRequestSiteUrl(req.headers);
  const content = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ].join('\n');

  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.write(content);
  res.end();

  return { props: {} };
};
