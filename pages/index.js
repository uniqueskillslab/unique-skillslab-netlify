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
                
                <Link href="/courses" className="btn-outline w-full text-center">
                  Learn More
                </Link>
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
