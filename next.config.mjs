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
        {
          protocol: 'https',
          hostname: 'ckuznzdvberxbsjnqvst.supabase.co',
          port: '',
          pathname: '/storage/v1/object/public/**',
        },
      ],
    },
  };
  
  export default nextConfig;