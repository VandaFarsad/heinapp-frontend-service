import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'hein@pp - HeiNa Baugemeinschaft',
        short_name: 'hein@pp',
        description: 'HeiNa - Baugemeinschaft GbR in Wilhelmsburg',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#67e4e6',
        icons: [
            {
                src: '/images/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/images/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
