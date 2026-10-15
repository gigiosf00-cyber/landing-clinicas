/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignora erros de TypeScript durante o build na Vercel
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignora avisos do ESLint durante o build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;