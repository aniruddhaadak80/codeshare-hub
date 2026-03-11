export function getBaseUrl() {
  const configuredUrl = process.env.NEXTAUTH_URL?.trim();
  if (configuredUrl) {
    return configuredUrl;
  }

  const vercelUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();

  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return 'http://localhost:3000';
}
