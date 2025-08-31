import { getCourses, getInstructors } from '../../lib/data'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const courses = getCourses()
    const baseUrl = 'https://unique-skills-lab.vercel.app'
    const currentDate = new Date().toISOString().split('T')[0]

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Home Page -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Courses Page -->
  <url>
    <loc>${baseUrl}/courses</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- About Page -->
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Individual Course Pages -->
  ${courses.map(course => `
  <url>
    <loc>${baseUrl}/course/${course.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`

    // Set proper headers for XML
    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')
    res.status(200).send(sitemap)
  } catch (error) {
    console.error('Error generating sitemap:', error)
    res.status(500).json({ message: 'Error generating sitemap' })
  }
}
