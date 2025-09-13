import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function PlayStoreApp({ appId }) {
  const router = useRouter()
  const [isInstalling, setIsInstalling] = useState(false)
  const [installProgress, setInstallProgress] = useState(0)

  const apps = {
    uniqueskillslab: {
      id: 'uniqueskillslab',
      name: 'UniqueSkillsLab',
      developer: 'Unique Skills Lab',
      description: 'Learn digital skills with our comprehensive courses. Access offline content, track your progress, and download certificates.',
      longDescription: 'UniqueSkillsLab is your gateway to mastering digital skills in a real studio environment. Our app provides comprehensive courses in Digital Marketing, App Development, Video Editing, and News Anchoring. Learn at your own pace with offline access to course materials, track your progress, and earn recognized certificates upon completion.',
      logo: '/assets/usl_logo.png',
      screenshots: [
        '/assets/course-web-development.jpg',
        '/assets/course-graphic-design.jpg',
        '/assets/course-facebook-monetization.jpg'
      ],
      features: [
        'Offline course access',
        'Progress tracking',
        'Certificate downloads',
        'Real-time notifications',
        'HD video content',
        'Interactive quizzes'
      ],
      rating: 4.8,
      reviews: 1247,
      size: '45.2 MB',
      version: '2.1.0',
      updated: 'December 15, 2024',
      downloads: '10,000+',
      category: 'Education',
      ageRating: 'Everyone',
      apkPath: '/app/UniqueSkillsLab.apk',
      price: 'Free'
    },
    uniqenewshd: {
      id: 'uniqenewshd',
      name: 'UniqeNewsHD',
      developer: 'Unique Skills Lab',
      description: 'Stay updated with the latest news and updates. Get real-time notifications and HD video content.',
      longDescription: 'UniqeNewsHD brings you the latest news and updates in high definition. Stay informed with real-time notifications, watch HD video content, and get breaking news alerts. Our app provides comprehensive coverage of local and international news with a focus on technology, education, and current affairs.',
      logo: '/assets/uniqenewshd_logo.png',
      screenshots: [
        '/assets/course-tiktok-mastery.jpg',
        '/assets/course-youtube-monetization.jpg',
        '/assets/course-placeholder.jpg'
      ],
      features: [
        'Latest news updates',
        'HD video content',
        'Real-time notifications',
        'Breaking news alerts',
        'Offline reading',
        'Customizable feed'
      ],
      rating: 4.6,
      reviews: 892,
      size: '38.7 MB',
      version: '1.8.5',
      updated: 'December 10, 2024',
      downloads: '5,000+',
      category: 'News & Magazines',
      ageRating: 'Everyone',
      apkPath: '/app/UniqeNewsHD.apk',
      price: 'Free',
      certificateInfo: {
        md5: 'C9:A3:D8:75:FA:FC:63:11:0D:C6:AB:81:0F:FB:D5:98',
        sha1: '12:98:05:AB:F9:16:A1:5B:CB:9D:53:41:15:DB:BB:D4:77:27:1E:C7',
        sha256: 'CC:8F:44:14:6E:76:4B:5E:AC:6A:A6:C2:4B:5F:1D:FA:5A:47:AC:F8:ED:4E:B9:E7:14:A7:88:36:8A:5B:20:76',
        validUntil: 'Saturday, June 7, 2053'
      }
    }
  }

  const app = apps[appId]

  useEffect(() => {
    if (!app) {
      router.push('/download-app')
    }
  }, [app, router])

  const handleInstall = async () => {
    setIsInstalling(true)
    setInstallProgress(0)

    // Simulate installation progress
    const progressInterval = setInterval(() => {
      setInstallProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsInstalling(false)
          // Trigger actual download
          window.open(app.apkPath, '_blank')
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }

    return stars
  }

  if (!app) {
    return <div>App not found</div>
  }

  return (
    <>
      <Head>
        <title>{app.name} - Download APK | Unique Skills Lab</title>
        <meta name="description" content={app.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#0d9488" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z"/>
                  </svg>
                </div>
                <span className="font-semibold text-gray-900">Play Store</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* App Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* App Icon */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl shadow-lg overflow-hidden bg-white">
                  <Image
                    src={app.logo}
                    alt={`${app.name} Logo`}
                    width={96}
                    height={96}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>

              {/* App Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{app.name}</h1>
                <p className="text-gray-600 mb-2">{app.developer}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {renderStars(app.rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {app.rating} ({app.reviews.toLocaleString()} reviews)
                  </span>
                </div>

                {/* App Details */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <span>{app.size}</span>
                  <span>•</span>
                  <span>{app.downloads} downloads</span>
                  <span>•</span>
                  <span>{app.category}</span>
                  <span>•</span>
                  <span>{app.ageRating}</span>
                </div>

                {/* Install Button */}
                <button
                  onClick={handleInstall}
                  disabled={isInstalling}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isInstalling ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Installing... {installProgress}%
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Install
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* App Screenshots */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {app.screenshots.map((screenshot, index) => (
                <div key={index} className="aspect-[9/16] rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={screenshot}
                    alt={`${app.name} Screenshot ${index + 1}`}
                    width={200}
                    height={355}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* App Description */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About this app</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{app.longDescription}</p>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Features:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {app.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* App Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">App Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Updated</span>
                <p className="font-medium">{app.updated}</p>
              </div>
              <div>
                <span className="text-gray-600">Version</span>
                <p className="font-medium">{app.version}</p>
              </div>
              <div>
                <span className="text-gray-600">Size</span>
                <p className="font-medium">{app.size}</p>
              </div>
              <div>
                <span className="text-gray-600">Downloads</span>
                <p className="font-medium">{app.downloads}</p>
              </div>
              <div>
                <span className="text-gray-600">Category</span>
                <p className="font-medium">{app.category}</p>
              </div>
              <div>
                <span className="text-gray-600">Content Rating</span>
                <p className="font-medium">{app.ageRating}</p>
              </div>
            </div>
          </div>

          {/* Certificate Information (for UniqeNewsHD) */}
          {app.certificateInfo && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Security Certificate</h2>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-600 text-sm">MD5</span>
                  <p className="font-mono text-sm break-all">{app.certificateInfo.md5}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">SHA1</span>
                  <p className="font-mono text-sm break-all">{app.certificateInfo.sha1}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">SHA-256</span>
                  <p className="font-mono text-sm break-all">{app.certificateInfo.sha256}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Valid Until</span>
                  <p className="font-medium">{app.certificateInfo.validUntil}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      appId: params.appId
    }
  }
}
