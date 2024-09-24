/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.gstatic.com',
          port: '',
          pathname: '/webp/gallery/**',
        },
      ],
    },
  };
  
  export default nextConfig;