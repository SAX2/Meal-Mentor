/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        port: "",
        pathname: "/npm/emoji-datasource-apple/**",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      }
    ],
  },
};

export default nextConfig;
