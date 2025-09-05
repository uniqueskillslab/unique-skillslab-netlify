import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getCourses, getCategories, refreshDataFromServer } from '../lib/data'

import ImageWithFallback from '../components/ImageWithFallback'

export default function Courses() {
  const router = useRouter()
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const loadData = () => {
    const allCourses = getCourses()
    const allCategoriesData = getCategories()
    const categoryNames = allCategoriesData.map(cat => cat.name)
    const allCategories = ['All', ...categoryNames]
    
    setCourses(allCourses)
    setFilteredCourses(allCourses)
    setCategories(allCategories)
  }

  useEffect(() => {
    loadData()
  }, [])

  // Refresh data when page becomes visible or window gains focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Refresh data from server when page becomes visible
        refreshDataFromServer()
        // Wait a bit for server data to load, then refresh UI
        setTimeout(() => {
          loadData()
        }, 1000)
      }
    }

    const handleFocus = () => {
      // Refresh data from server when window gains focus
      refreshDataFromServer()
      setTimeout(() => {
        loadData()
      }, 1000)
    }

    const handleStorageChange = (e) => {
      if (e.key && e.key.startsWith('usl_')) {
        console.log('Storage change detected:', e.key, e.newValue)
        loadData()
      }
    }

    // Listen for file update events from the real file updater
    const handleCoursesFileUpdate = (event) => {
      console.log('Courses file updated (same tab), refreshing data...')
      loadData()
    }

    const handleCategoriesFileUpdate = (event) => {
      console.log('Categories file updated (same tab), refreshing data...')
      loadData()
    }

    // Cross-browser updates handled via localStorage sync

    // Listen for various events that indicate data might have changed
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('uslCoursesFileUpdated', handleCoursesFileUpdate)
    window.addEventListener('uslCategoriesFileUpdated', handleCategoriesFileUpdate)
    
    // Listen for cross-browser updates (removed - using localStorage sync instead)
    
    // Also refresh periodically (every 30 seconds) to catch any missed updates
    const interval = setInterval(loadData, 30000)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('uslCoursesFileUpdated', handleCoursesFileUpdate)
      window.removeEventListener('uslCategoriesFileUpdated', handleCategoriesFileUpdate)
      // cleanupCoursesListener() - removed
      // cleanupCategoriesListener() - removed
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    let filtered = courses

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredCourses(filtered)
  }, [courses, selectedCategory, searchTerm])

  return (
    <>
      <Head>
        <title>Our Courses - Unique Skills Lab</title>
        <meta name="description" content="Explore our comprehensive range of IT and Media courses including Digital Marketing, App Development, Video Editing, and News Anchoring." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-accent-500 text-white pt-20 pb-16">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Courses
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Choose from our comprehensive range of practical courses designed to give you real-world skills and career opportunities
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-gray-50 py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchTerm('')
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  Showing {filteredCourses.length} of {courses.length} courses
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="card group hover:shadow-2xl transition-all duration-300">
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      <ImageWithFallback
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {course.category}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        {course.duration}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {course.description}
                    </p>
                    
                    {/* Instructor Info */}
                    {course.instructor && (
                      <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
                        <ImageWithFallback
                          src={course.instructor.photoUrl}
                          alt={course.instructor.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{course.instructor.name}</p>
                          <p className="text-sm text-gray-600">{course.instructor.specialization}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary-600">{course.price}</span>
                      <span className="text-gray-500 text-sm">{course.duration}</span>
                    </div>
                    
                    <div className="space-y-3">
                      <button 
                        onClick={() => {
                          const message = `Hi! I'm interested in enrolling in the "${course.title}" course. Can you provide more details about enrollment, schedule, and payment options?`
                          const whatsappUrl = `https://wa.me/923296219415?text=${encodeURIComponent(message)}`
                          window.open(whatsappUrl, '_blank')
                        }}
                        className="btn-primary w-full flex items-center justify-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/>
                        </svg>
                        <span>Enroll Via WhatsApp</span>
                      </button>
                      <button 
                        onClick={() => {
                          window.open('tel:03176100190', '_self')
                        }}
                        className="btn-outline w-full flex items-center justify-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>Call Now</span>
                      </button>
                      <button 
                        onClick={() => router.push(`/course/${course.id}`)}
                        className="btn-outline w-full flex items-center justify-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Course Categories Info */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Course Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer courses in two main categories to help you specialize in your area of interest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card text-center">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">IT & Technology</h3>
              <p className="text-gray-600 mb-6">
                Learn modern programming languages, mobile app development, and cutting-edge technologies that are in high demand in today's digital world.
              </p>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Mobile App Development</li>
                <li>• Web Development</li>
                <li>• Programming Fundamentals</li>
                <li>• Software Development</li>
              </ul>
            </div>

            <div className="card text-center">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Media & Communication</h3>
              <p className="text-gray-600 mb-6">
                Master digital marketing, video editing, news anchoring, and communication skills in our professional studio environment.
              </p>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Digital Marketing & Social Media</li>
                <li>• Video Editing & Post Production</li>
                <li>• News Anchoring & Broadcasting</li>
                <li>• Content Creation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-500 to-accent-500 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Enroll?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Take the first step towards your new career. Contact us today to learn more about our courses and enrollment process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:03176100190" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg">
              Call Now: 0317-6100190
            </a>
            <a href="https://wa.me/923296219415" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg">
              WhatsApp: 0329-6219415
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
