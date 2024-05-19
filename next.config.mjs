import withPlaiceholder from "@plaiceholder/next";
/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.tmdb.org',
        },
        {
          protocol: 'https',
          hostname: 'tmdb-image-prod.b-cdn.net'
        }
      ],
    },
  };

export default withPlaiceholder(nextConfig);

