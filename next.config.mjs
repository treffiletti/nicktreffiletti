/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/feed.xml", destination: "/rss", permanent: true }];
  },
};
export default nextConfig;
