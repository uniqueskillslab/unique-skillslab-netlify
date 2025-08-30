import { useState, useEffect } from 'react'
import Head from 'next/head'
import { getCourses, getCategories } from '../lib/data'
import ImageWithFallback from '../components/ImageWithFallback'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const allCourses = getCourses()
    const allCategories = ['All', ...getCategories()]
    
    setCourses(allCourses)
    setFilteredCourses(allCourses)
    setCategories(allCategories)
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
                      <button className="btn-primary w-full">
                        Enroll Now
                      </button>
                      <button className="btn-outline w-full">
                        View Details
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
