
export default async function sitemap() {
  const base = process.env.SITE_URL || 'http://localhost:5173'
  const routes = ['', '/services', '/industries', '/copilot', '/pricing', '/contact']
  return routes.map((r) => ({ url: `${base}${r}`, lastModified: new Date() }))
}
