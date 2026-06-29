import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard search engines & AI crawlers — full access to public content
      {
        userAgent: ['*', 'GPTBot', 'Google-Extended', 'anthropic-ai', 'Claude-Web', 'PerplexityBot', 'Amazonbot', 'cohere-ai'],
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: 'https://bestinternationresources.com/sitemap.xml',
    host: 'https://bestinternationresources.com',
  }
}
