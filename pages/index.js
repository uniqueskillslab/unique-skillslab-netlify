import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { getCourses } from '../lib/data'
import ImageWithFallback from '../components/ImageWithFallback'

export default function Home() {
  const [courses, setCourses] = useState([])
  const [currentTagline, setCurrentTagline] = useState(0)

  useEffect(() => {
    setCourses(getCourses())
    
    // Rotate taglines
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const taglines = [
    "Practical Training for Real Careers.",
    "Learn. Create. Succeed.",
    "Where Media Meets Technology.",
    "Skills Today, Success Tomorrow."
  ]

  const whyChooseUs = [
    {
      icon: "🎬",
      title: "Real Studio Environment",
      description: "Learn inside a professional news & editing studio"
    },
    {
      icon: "👐",
      title: "Hands-on Training",
      description: "Get practical experience with real projects"
    },
    {
      icon: "🏆",
      title: "Recognized Certificates",
      description: "Certificates recognized locally and internationally"
    },
    {
      icon: "👨‍🏫",
      title: "Industry Experts",
      description: "Instructors with real industry experience"
    },
    {
      icon: "💼",
      title: "Internship Opportunities",
      description: "Internship opportunities in our media setup"
    },
    {
      icon: "💰",
      title: "Affordable Fees",
      description: "Quality education at reasonable prices"
    }
  ]

  return (
    <>
      <Head>
        <title>Unique Skills Lab - Practical IT & Media Training</title>
        <meta name="description" content="Learn Media, IT, and Digital Marketing in a Real Studio Environment. Short courses in Digital Marketing, App Development, Video Editing, and News Anchoring." />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 text-white pt-20 pb-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Unique Skills Lab
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Practical Training for Real Careers
            </p>
            <p className="text-lg md:text-xl mb-10 text-primary-200">
              Learn Media, IT, and Digital Marketing in a Real Studio Environment
            </p>
            
            {/* Rotating Taglines */}
            <div className="h-8 mb-8">
              <p className="text-lg text-primary-100 animate-pulse">
                {taglines[currentTagline]}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses" className="btn-secondary text-lg px-8 py-4">
                Enroll Now
              </Link>
              <Link href="/about" className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Promo Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 text-white py-8">
        <div className="container-custom text-center">
          <div className="flex items-center justify-center space-x-4">
            <div className="animate-pulse">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Grand Opening Discount – 20% off for first 20 students</h2>
              <p className="text-lg">Limited Seats | Admission Open Now</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of practical courses designed to give you real-world skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.slice(0, 4).map((course) => (
              <div key={course.id} className="card group hover:scale-105 transition-transform duration-300">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {course.category}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-primary-600 font-semibold">{course.price}</span>
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
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/>
                    </svg>
                    <span>Enroll Now</span>
                  </button>
                  <Link href={`/course/${course.id}`} className="btn-outline w-full text-center">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/courses" className="btn-primary text-lg px-8 py-4">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Unique Skills Lab?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the perfect environment for learning practical skills that lead to real career opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="card text-center group hover:shadow-2xl transition-shadow duration-300">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
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
            Join hundreds of students who have transformed their careers with our practical training programs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg">
              Explore Courses
            </Link>
            <Link href="#contact" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
