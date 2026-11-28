/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  async redirects() {
    return [
      {
        source: "/pop-podcast",
        destination: "https://podcast.benoror.com",
        permanent: true,
      },
      {
        source: "/poppod",
        destination: "https://podcast.benoror.com",
        permanent: true,
      },
    ];
  },
  outputFileTracingIncludes: {
    "/api/chat": ["../../packages/data/src/web/chatbot/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/benoror/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "user-images.githubusercontent.com",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "d3t3ozftmdmh3i.cloudfront.net",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
