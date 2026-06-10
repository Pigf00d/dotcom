/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/burntbase",
        destination: "https://burntbase.com",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

