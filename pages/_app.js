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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="IT training, media courses, digital marketing, app development, video editing, news anchoring, practical skills, studio training" />
        <meta name="author" content="Unique Skills Lab" />
        
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
