# Lockwood IT Solutions website

Business-only Managed Service Provider website for Lockwood IT Solutions.

## Business positioning

Lockwood IT Solutions provides founder-led, security-first managed IT for small businesses that need dependable support, stronger protection, Microsoft 365 administration, backup, networking, and practical technology guidance.

The public site intentionally avoids unverified service metrics, public per-user pricing, 24/7 claims, compliance guarantees, residential plans, and unverifiable testimonials.

## Technology

- Next.js static export
- React and TypeScript
- Tailwind CSS
- Azure Static Web Apps
- Azure Static Web Apps managed API for the contact form
- GitHub Actions deployment
- Node.js 22
- No Azure DevOps dependency

## Local development

```powershell
npm.cmd ci
npm.cmd run dev
```

Open `http://localhost:3000`.

## Validation

```powershell
npm.cmd run typecheck
npm.cmd run build
npm.cmd run check:output
Push-Location api
npm.cmd ci
npm.cmd test
Pop-Location
```

## Contact API settings

Configure these as Azure Static Web Apps environment variables. Do not commit their values.

- `SENDGRID_API_KEY`
- `CONTACT_FROM`
- `CONTACT_TO`
- `ALLOWED_ORIGINS` (optional comma-separated additions)

The contact function uses the SendGrid v3 REST API through Node's built-in `fetch`; it has no third-party runtime dependencies.

## Deployment

The workflow validates pull requests and creates Azure Static Web Apps preview environments. Merges to `main` deploy production after validation succeeds.

Required GitHub Actions repository secret:

- `AZURE_STATIC_WEB_APPS_API_TOKEN`

Application secrets remain in Azure Static Web Apps application settings, not GitHub build variables.

## Launch boundary

Do not change Namecheap DNS or retire the existing App Service until the pull-request preview and production Static Web Apps hostname have been reviewed and the contact form has been tested end to end.
