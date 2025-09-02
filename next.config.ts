/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so Azure Static Web Apps can serve /out
  output: 'export',

  // Required if you use next/image during export
  images: { unoptimized: true },

  // Optional: keep normal URLs (no trailing slash)
  trailingSlash: false,

  // Optional: turn off React strict mode if you see double effects in dev
  // reactStrictMode: true,
};

export default nextConfig;
