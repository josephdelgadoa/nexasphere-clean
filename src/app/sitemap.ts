import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nexasphere.clean';
  
  // Base pages
  const routes = ['', '/login', '/dashboard', '/cleaner'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }));

  // Dynamic location pages
  const cities = ['palo-alto', 'san-francisco', 'los-angeles', 'miami', 'new-york'];
  const locationRoutes = cities.map((city) => ({
    url: `${baseUrl}/locations/${city}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...locationRoutes];
}
