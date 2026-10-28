import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Garante que a Vercel empacota os ficheiros JSON da pasta data para a rota das barbearias
  outputFileTracingIncludes: {
    '/barbearia/**': ['./src/data/**/*'],
  },
};

export default nextConfig;