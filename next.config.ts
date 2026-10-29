import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Força o empacotamento de toda a pasta src/data em todas as rotas da Vercel
  outputFileTracingIncludes: {
    '/**/*': ['./src/data/**/*'],
  },
};

export default nextConfig;