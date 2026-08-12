import type { IncomingHttpHeaders } from 'node:http';

const LOCAL_SITE_URL = 'http://localhost:3000';
const LOCAL_HOST_PATTERN = /^(localhost|127\.0\.0\.1)(:\d+)?$/;
const SAFE_HOST_PATTERN = /^[a-z0-9.-]+(?::\d+)?$/i;

function normalizeSiteUrl(value: string | undefined): string | undefined {
  if (!value?.trim()) {
    return undefined;
  }

  try {
    const url = new URL(value.trim());

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return undefined;
    }

    return url.origin;
  } catch {
    return undefined;
  }
}

function firstHeaderValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Returns the canonical public origin configured for browser-rendered metadata. */
export function getConfiguredSiteUrl(): string | undefined {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
}

/** Resolves a safe request origin for server-generated robots and sitemap responses. */
export function getRequestSiteUrl(headers: IncomingHttpHeaders): string {
  const configuredUrl = getConfiguredSiteUrl();

  if (configuredUrl) {
    return configuredUrl;
  }

  const forwardedHost = firstHeaderValue(headers['x-forwarded-host']);
  const requestHost = forwardedHost?.split(',')[0]?.trim() || headers.host?.trim();

  if (!requestHost || !SAFE_HOST_PATTERN.test(requestHost)) {
    return LOCAL_SITE_URL;
  }

  const forwardedProtocol = firstHeaderValue(headers['x-forwarded-proto'])?.split(',')[0]?.trim();
  const protocol = forwardedProtocol === 'http' || forwardedProtocol === 'https'
    ? forwardedProtocol
    : LOCAL_HOST_PATTERN.test(requestHost)
      ? 'http'
      : 'https';

  return `${protocol}://${requestHost}`;
}
