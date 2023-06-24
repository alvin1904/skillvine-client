/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }
const nextConfig = {
  experimental: {
    appDir: false,
  },
  async rewrites() {
    console.log("process.env.NEXT_PUBLIC_BASE_URL", process.env.NEXT_PUBLIC_BASE_URL)
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
      },
    ];
  },
  images: {
    domains: ["avatars.githubusercontent.com","lh3.googleusercontent.com", "skillvine.up.railway.app"],
  },
};

module.exports = nextConfig;
