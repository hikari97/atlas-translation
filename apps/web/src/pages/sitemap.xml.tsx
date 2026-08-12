import type { GetServerSideProps } from 'next';
import { getRequestSiteUrl } from '../lib/seo/siteUrl';

export default function SitemapXmlPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const siteUrl = getRequestSiteUrl(req.headers);
  const content = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url>',
    `    <loc>${siteUrl}</loc>`,
    '    <changefreq>weekly</changefreq>',
    '    <priority>1.0</priority>',
    '  </url>',
    '</urlset>',
    '',
  ].join('\n');

  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800');
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.write(content);
  res.end();

  return { props: {} };
};
