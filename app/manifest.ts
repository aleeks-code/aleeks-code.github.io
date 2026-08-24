import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: `Portfolio di ${site.name}, ${site.role}.`,
    start_url: '/',
    display: 'browser',
    background_color: '#F0EBE1',
    theme_color: '#0A1428',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
