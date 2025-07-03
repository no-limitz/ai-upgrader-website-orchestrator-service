/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Environment variables that should be available on the client
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  },
  
  // API routes configuration with flexible service URLs
  async rewrites() {
    return [
      {
        source: '/api/analyze/:path*',
        destination: `${process.env.ANALYZER_SERVICE_URL || 'http://analyzer:8001'}/analyze/:path*`,
      },
      {
        source: '/api/generate/:path*',
        destination: `${process.env.BUILDER_SERVICE_URL || 'http://builder:8002'}/generate/:path*`,
      },
    ];
  },
  
  // CORS headers for development
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
  
  // Image optimization
  images: {
    domains: ['localhost'],
    unoptimized: true, // For POC simplicity
  },
  
  // Output configuration for Docker
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  
  // Flexible port configuration for deployment platforms like Coolify
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

module.exports = nextConfig;