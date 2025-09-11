// Sitemap generation for SEO
import { getCourses } from '../../lib/data'

export default function handler(req, res) {
  const baseUrl = req.headers.host.includes('localhost') 
    ? 'http://localhost:3000' 
    : 'https://unique-skills-lab.vercel.app'

  // Get all courses for dynamic sitemap
  const courses = getCourses()
  
  // Static pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/courses', priority: '0.9', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/scholarship', priority: '0.9', changefreq: 'monthly' },
    { url: '/apply-creator', priority: '0.7', changefreq: 'monthly' },
    { url: '/download-app', priority: '0.6', changefreq: 'monthly' },
    { url: '/thank-you', priority: '0.5', changefreq: 'yearly' }
  ]

  // Generate course pages
  const coursePages = courses.map(course => ({
    url: `/course/${course.id}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: new Date().toISOString()
  }))

  // Combine all pages
  const allPages = [...staticPages, ...coursePages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`

  res.setHeader('Content-Type', 'application/xml')
  res.status(200).send(sitemap)
}
