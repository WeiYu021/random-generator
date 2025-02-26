import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin(
    // Specify a custom path here
    './src/i18n.ts'
  );

// const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true, // 为生产环境生成浏览器source maps
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.devtool = 'source-map'; // 为开发环境启用source map
    }
    return config;
  },
  images: {
    // 允许加载图片的host
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'favicon.im',
      },
      {
        protocol: 'https',
        hostname: 'domainscore.ai',
      },
      {
        protocol: 'https',
        hostname: 'llmgpuhelper.com',
      },
    ],
    // 允许加载svg图片
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  optimizeFonts: true,
};
 
export default withNextIntl(nextConfig);