import '../styles/globals.css'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function App({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check authentication status on client side
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken')
        setIsAuthenticated(!!token)
      }
    }
    
    checkAuth()
    
    // Listen for auth changes
    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  return (
    <>
      <Head>
        <title>Unique Skills Lab - Practical IT & Media Training</title>
        <meta name="description" content="Short courses in Digital Marketing, App Development, Video Editing, and News Anchoring in a real studio environment. Learn practical skills for real careers." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="keywords" content="IT training, media courses, digital marketing, app development, video editing, news anchoring, practical skills, studio training" />
        <meta name="author" content="Unique Skills Lab" />
        
        {/* Performance and SEO */}
        <meta name="theme-color" content="#0D9488" />
        <meta name="msapplication-TileColor" content="#0D9488" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://unique-skills-lab.vercel.app/" />
        <meta property="og:title" content="Unique Skills Lab - Practical IT & Media Training" />
        <meta property="og:description" content="Learn Media, IT, and Digital Marketing in a Real Studio Environment" />
        <meta property="og:image" content="/assets/usl_logo.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://unique-skills-lab.vercel.app/" />
        <meta property="twitter:title" content="Unique Skills Lab - Practical IT & Media Training" />
        <meta property="twitter:description" content="Learn Media, IT, and Digital Marketing in a Real Studio Environment" />
        <meta property="twitter:image" content="/assets/usl_logo.png" />

        <link rel="icon" href="/assets/usl_logo.png" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Unique Skills Lab",
              "description": "Practical IT & Media Training in a Real Studio Environment",
              "url": "https://unique-skills-lab.vercel.app",
              "logo": "https://unique-skills-lab.vercel.app/assets/usl_logo.png",
              "image": "https://unique-skills-lab.vercel.app/assets/usl_logo.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Makkah Town Multan Road",
                "addressLocality": "Phoolnagar",
                "addressCountry": "Pakistan"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+92-317-6100190",
                  "contactType": "customer service",
                  "availableLanguage": "English"
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+92-329-6219415",
                  "contactType": "customer service",
                  "availableLanguage": "English"
                }
              ],
              "email": "uniqueskillslab@gmail.com",
              "sameAs": [
                "https://wa.me/923296219415"
              ],
              "foundingDate": "2024",
              "slogan": "Practical Training for Real Careers",
              "knowsAbout": [
                "Digital Marketing",
                "App Development", 
                "Video Editing",
                "News Anchoring",
                "Web Development",
                "Graphic Design",
                "IT Training",
                "Media Production"
              ]
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main className="flex-grow">
          <Component {...pageProps} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        </main>
        <Footer />
      </div>
    </>
  )
}
