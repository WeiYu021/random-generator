import type { MetadataRoute } from 'next';
import { appConfig } from '@/lib/appConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const defaultRoutes: MetadataRoute.Sitemap = [
    {
      url: '', // home
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'random-qr-code',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  const localizedRoutes: MetadataRoute.Sitemap = appConfig.i18n.locales
    .filter((locale) => locale !== appConfig.i18n.defaultLocale)
    .flatMap((locale) =>
      defaultRoutes.map((route) => ({
        ...route,
        url: route.url === '' ? locale : `${locale}/${route.url}`,
      }))
    );

  const allRoutes = [...defaultRoutes, ...localizedRoutes];

  const sitemapData = allRoutes.map((route) => {
    const routeUrl = route.url === '' ? '' : `/${route.url}`;
    return {
      ...route,
      url: `${process.env.WEB_URL}${routeUrl}`,
    };
  });

  return sitemapData;
}