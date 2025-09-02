/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 🚀 Important for Azure Static Web Apps (static export)
  output: "export",

  // Allow images from your domain (adjust as needed)
  images: {
    unoptimized: true, // required for static export (no Image Optimization server)
  },

  // Optional: Set basePath if deploying to a subpath
  // basePath: "",

  // Optional: Add trailing slash for static hosting consistency
  trailingSlash: true
};

module.exports = nextConfig;
