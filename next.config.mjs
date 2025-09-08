/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/claude-code',
  assetPrefix: '/claude-code',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
