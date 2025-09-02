import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getCourseById, getInstructors } from '../../lib/data'
import ImageWithFallback from '../../components/ImageWithFallback'

export default function CourseDetails() {
  const router = useRouter()
  const { id } = router.query
  const [course, setCourse] = useState(null)
  const [instructors, setInstructors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const courseData = getCourseById(parseInt(id))
      const allInstructors = getInstructors()
      
      if (courseData) {
        setCourse(courseData)
        setInstructors(allInstructors)
      } else {
        router.push('/courses')
      }
      setLoading(false)
    }
  }, [id, router])

  const handleEnrollNow = () => {
    const message = `Hi! I'm interested in enrolling in the "${course.title}" course. Can you provide more details about enrollment, schedule, and payment options?`
    const whatsappUrl = `https://wa.me/923296219415?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleCallNow = () => {
    window.open('tel:03176100190', '_self')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!course) {
    return null
  }

  return (
    <>
      <Head>
        <title>{course.title} - Unique Skills Lab</title>
        <meta name="description" content={course.description} />
        <meta name="keywords" content={`${course.title}, ${course.category}, Unique Skills Lab, training, course`} />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-accent-500 text-white pt-20 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-primary-100 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Courses</span>
              </button>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {course.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-lg">
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                {course.category}
              </span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                {course.duration}
              </span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full font-bold">
                {course.price}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Course Image */}
              <div className="mb-8">
                <ImageWithFallback
                  src={course.image}
                  alt={course.title}
                  className="w-full h-80 object-cover rounded-lg shadow-lg"
                />
              </div>

              {/* Course Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Description</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* What You'll Learn */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.learningOutcomes && course.learningOutcomes.length > 0 ? (
                    course.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center mt-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-600">{outcome}</span>
                      </div>
                    ))
                  ) : (
                    // Fallback to hardcoded outcomes if none provided
                    getCourseLearningOutcomes(course.category).map((outcome, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center mt-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-600">{outcome}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Course Structure */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Structure</h2>
                <div className="space-y-4">
                  {course.courseStructure && course.courseStructure.length > 0 ? (
                    course.courseStructure.map((module, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">Module {index + 1}: {module.title}</h3>
                            <p className="text-gray-600 text-sm">{module.description}</p>
                          </div>
                          <span className="text-primary-600 font-medium">{module.duration}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Fallback to hardcoded structure if none provided
                    getCourseStructure(course.category).map((module, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">Module {index + 1}: {module.title}</h3>
                            <p className="text-gray-600 text-sm">{module.description}</p>
                          </div>
                          <span className="text-primary-600 font-medium">{module.duration}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Enrollment Card */}
              <div className="card sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Enroll in This Course</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Course Fee:</span>
                    <span className="text-2xl font-bold text-primary-600">{course.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium text-gray-900">{course.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium text-gray-900">{course.category}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleEnrollNow}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/>
                    </svg>
                    <span>Enroll via WhatsApp</span>
                  </button>
                  
                  {course.pdfLink && (
                    <a
                      href={course.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline w-full flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download Course Structure</span>
                    </a>
                  )}
                  
                  <button
                    onClick={handleCallNow}
                    className="btn-outline w-full flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Call Now</span>
                  </button>
                </div>

                <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                  <h4 className="font-semibold text-primary-800 mb-2">Limited Time Offer!</h4>
                  <p className="text-sm text-primary-700">
                    Get 20% off for early enrollment. Limited seats available!
                  </p>
                </div>
              </div>

              {/* Instructor Info */}
              {course.instructor && (
                <div className="card mt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Your Instructor</h3>
                  <div className="flex items-center space-x-4">
                    <ImageWithFallback
                      src={course.instructor.photoUrl}
                      alt={course.instructor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{course.instructor.name}</h4>
                      <p className="text-sm text-gray-600">{course.instructor.specialization}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-3 text-sm">
                    {course.instructor.biography}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-500 to-accent-500 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Join hundreds of students who have transformed their careers with our practical training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleEnrollNow}
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg flex items-center justify-center space-x-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/>
                  </svg>
                  <span>Enroll via WhatsApp</span>
                </button>
                <button
                  onClick={handleCallNow}
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg flex items-center justify-center space-x-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Call Now: 0317-6100190</span>
                </button>
              </div>
            </div>
          </section>
        </>
      )
    }

    // Helper functions for course content
    function getCourseLearningOutcomes(category) {
      const outcomes = {
        'IT': [
          'Master modern programming languages and frameworks',
          'Build real-world mobile applications',
          'Understand software development lifecycle',
          'Learn industry best practices and coding standards',
          'Develop problem-solving and analytical thinking',
          'Create portfolio-worthy projects'
        ],
        'Media': [
          'Master professional video editing software',
          'Create engaging social media content',
          'Develop strong communication skills',
          'Learn broadcasting and presentation techniques',
          'Understand digital marketing strategies',
          'Build a professional media portfolio'
        ]
      }
      return outcomes[category] || outcomes['IT']
    }

    function getCourseStructure(category) {
      const structure = {
        'IT': [
          { title: 'Fundamentals & Setup', description: 'Introduction to development environment and basic concepts', duration: '2 weeks' },
          { title: 'Core Programming', description: 'Learning programming languages and frameworks', duration: '6 weeks' },
          { title: 'Project Development', description: 'Building real applications and solving problems', duration: '4 weeks' },
          { title: 'Testing & Deployment', description: 'Quality assurance and launching applications', duration: '2 weeks' }
        ],
        'Media': [
          { title: 'Foundation Skills', description: 'Basic concepts and software introduction', duration: '2 weeks' },
          { title: 'Core Techniques', description: 'Advanced editing and production methods', duration: '6 weeks' },
          { title: 'Project Work', description: 'Creating professional content and portfolios', duration: '4 weeks' },
          { title: 'Industry Preparation', description: 'Career guidance and industry insights', duration: '2 weeks' }
        ]
      }
      return structure[category] || structure['IT']
    }
