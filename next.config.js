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
      {
        source: "/projects/burntbase",
        destination: "https://burntbase.com",
        permanent: true,
      },
      {
        source: "/projects/crossword",
        destination: "https://crossword-phi-ashy.vercel.app/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

