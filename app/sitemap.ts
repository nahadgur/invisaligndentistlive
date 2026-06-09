import type { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { LOCATIONS, toSlug } from '@/data/locations';
import { siteConfig } from '@/data/site';

function url(
  path: string,
  priority: number = 0.7,
  changeFreq: MetadataRoute.Sitemap[0]['changeFrequency'] = 'weekly',
): MetadataRoute.Sitemap[0] {
  return {
    url: `${siteConfig.url}${path}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: changeFreq,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const allCities = Object.values(LOCATIONS).flat();

  const staticPages: MetadataRoute.Sitemap = [
    url('/',          1.0, 'weekly'),
    url('/services',  0.9, 'weekly'),
    url('/location',  0.9, 'weekly'),
    url('/blog',      0.8, 'daily'),
  ];

  const servicePages: MetadataRoute.Sitemap = services.map(s =>
    url(`/services/${s.slug}`, 0.8),
  );

  const locationPages: MetadataRoute.Sitemap = allCities.map(city =>
    url(`/location/${toSlug(city)}`, 0.7),
  );

  return [...staticPages, ...servicePages, ...locationPages];
}
