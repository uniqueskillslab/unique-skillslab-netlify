import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getCourses } from '../lib/data'

export default function Scholarship() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    age_city: '',
    course: '',
    reason: '',
    contact: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [courses, setCourses] = useState([])

  useEffect(() => {
    // Load all courses from data
    const allCourses = getCourses()
    setCourses(allCourses)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')
    
    try {
      // Validate form data - all fields are required
      if (!formData.name.trim() || !formData.age_city.trim() || !formData.course.trim() || !formData.reason.trim() || !formData.contact.trim()) {
        setSubmitStatus('error')
        setIsSubmitting(false)
        setTimeout(() => setSubmitStatus(''), 3000)
        return
      }
      
      // Submit to Formspree (same as contact form)
      const response = await fetch('https://formspree.io/f/xovnprzr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          age_city: formData.age_city.trim(),
          course: formData.course.trim(),
          reason: formData.reason.trim(),
          contact: formData.contact.trim(),
          _subject: 'New Scholarship Application - Unique Skills Lab'
        })
      })
      
      if (response.ok) {
        // Redirect to thank you page (same as contact form)
        router.push('/thank-you')
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting scholarship form:', error)
      setSubmitStatus('error')
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(''), 3000)
    }
  }

  const scrollToForm = () => {
    document.getElementById('application-form').scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  return (
    <>
      <Head>
        <title>Free IT Courses for Orphans & Needy Students | 100% Free Training - Unique Skills Lab</title>
        <meta name="description" content="Apply for 100% free IT training courses at Unique Skills Lab. We offer free education to orphans, disabled students, and learners without income sources. Web Development, App Development, Digital Marketing courses available. Apply now!" />
        <meta name="keywords" content="free IT courses, free computer courses, scholarship program, orphan education, disabled students, free training, IT institute, Phoolnagar, Multan, Pakistan, free web development, free app development, free digital marketing, free graphic design, free video editing, free education, financial assistance, need-based scholarship" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Unique Skills Lab" />
        <link rel="canonical" href="https://unique-skills-lab.vercel.app/scholarship" />
        
        {/* Enhanced Open Graph */}
        <meta property="og:title" content="Free IT Courses for Orphans & Needy Students | 100% Free Training" />
        <meta property="og:description" content="Apply for 100% free IT training courses at Unique Skills Lab. We offer free education to orphans, disabled students, and learners without income sources. Web Development, App Development, Digital Marketing courses available." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://unique-skills-lab.vercel.app/scholarship" />
        <meta property="og:image" content="https://unique-skills-lab.vercel.app/assets/usl_logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Unique Skills Lab" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Enhanced */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free IT Courses for Orphans & Needy Students | 100% Free Training" />
        <meta name="twitter:description" content="Apply for 100% free IT training courses at Unique Skills Lab. We offer free education to orphans, disabled students, and learners without income sources." />
        <meta name="twitter:image" content="https://unique-skills-lab.vercel.app/assets/usl_logo.png" />
        <meta name="twitter:site" content="@uniqueskillslab" />
        <meta name="twitter:creator" content="@uniqueskillslab" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#0D9488" />
        <meta name="msapplication-TileColor" content="#0D9488" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* JSON-LD Structured Data for Scholarship Program */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Scholarship",
              "name": "Free IT Courses Scholarship Program",
              "description": "100% free IT training courses for orphans, disabled students, and learners without income sources. Courses include Web Development, App Development, Digital Marketing, Graphic Design, Video Editing, and News Anchoring.",
              "provider": {
                "@type": "EducationalOrganization",
                "name": "Unique Skills Lab",
                "url": "https://unique-skills-lab.vercel.app",
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
                    "contactType": "customer service"
                  },
                  {
                    "@type": "ContactPoint",
                    "telephone": "+92-329-6219415",
                    "contactType": "customer service"
                  }
                ]
              },
              "scholarshipType": "Merit and Need Based",
              "eligibilityCriteria": "Orphans, disabled students, and learners without income sources",
              "applicationDeadline": "Ongoing",
              "numberOfAwards": "Limited seats available",
              "value": "100% free tuition",
              "url": "https://unique-skills-lab.vercel.app/scholarship",
              "datePosted": "2024-01-01",
              "validThrough": "2024-12-31",
              "educationalLevel": "Beginner to Intermediate",
              "courseMode": "In-person",
              "inLanguage": "English",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "PKR",
                "availability": "https://schema.org/InStock"
              }
            })
          }}
        />
        
        {/* FAQ Schema for Scholarship */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Who is eligible for free IT courses?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Orphans, disabled students, and learners without income sources are eligible for our free IT courses scholarship program."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What courses are available for free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer free courses in Web Development, App Development, Digital Marketing, Graphic Design, Video Editing, and News Anchoring."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I apply for free courses?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Fill out our online application form with your details, course interest, and reason for needing free education. We will review your application within 2-3 business days."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is there any cost for free courses?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, there is absolutely no cost. All selected students receive 100% free tuition for their chosen IT course."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What documents are required for application?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We may request supporting documents to verify your eligibility. This could include proof of orphan status, disability certificate, or income verification documents."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long are the free courses?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Course duration varies from 2-12 weeks depending on the course complexity and requirements. All courses are designed to be practical and career-focused."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 text-white pt-20 pb-16">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Free IT Courses for Orphans, Disabled & Needy Students
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              We are not an NGO. We are an IT Institute helping students who cannot afford education.
            </p>
            <button
              onClick={scrollToForm}
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Our Free Education Program
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At <strong>Unique Skills Lab</strong>, we believe education should be accessible to everyone. 
                That's why we offer 100% free IT training to orphans, disabled students, and learners without income sources.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our mission is to bridge the digital divide by providing practical, industry-relevant skills 
                to those who need it most. We understand that financial constraints should never be a barrier 
                to quality education and career opportunities.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-4xl mb-3">🎓</div>
                  <h3 className="font-semibold text-gray-900 mb-2">100% Free</h3>
                  <p className="text-gray-600 text-sm">No hidden fees or charges</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">👥</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Open to All</h3>
                  <p className="text-gray-600 text-sm">Orphans, disabled, and needy students</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">💼</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Career Ready</h3>
                  <p className="text-gray-600 text-sm">Industry-relevant practical skills</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Free IT Courses Available in Pakistan
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Free Web Development Course</h3>
                <p className="text-gray-600 mb-4">
                  Learn modern web development technologies including HTML, CSS, JavaScript, React, and Node.js. 
                  Perfect for students who want to start a career in web development.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Frontend Development (HTML, CSS, JavaScript)</li>
                  <li>• React.js Framework</li>
                  <li>• Backend Development (Node.js)</li>
                  <li>• Database Management</li>
                  <li>• Project Portfolio Building</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Free App Development Course</h3>
                <p className="text-gray-600 mb-4">
                  Master mobile app development for Android and iOS platforms. Learn to create 
                  professional mobile applications from scratch.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Android App Development</li>
                  <li>• iOS App Development</li>
                  <li>• Cross-platform Development</li>
                  <li>• App Store Publishing</li>
                  <li>• UI/UX Design for Mobile</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Free Digital Marketing Course</h3>
                <p className="text-gray-600 mb-4">
                  Learn digital marketing strategies including social media marketing, SEO, 
                  content creation, and online advertising.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Social Media Marketing</li>
                  <li>• Search Engine Optimization (SEO)</li>
                  <li>• Content Creation & Strategy</li>
                  <li>• Google Ads & Facebook Ads</li>
                  <li>• Analytics & Performance Tracking</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Free Graphic Design Course</h3>
                <p className="text-gray-600 mb-4">
                  Master graphic design tools and techniques including Adobe Photoshop, Illustrator, 
                  and InDesign for professional design work.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Adobe Photoshop</li>
                  <li>• Adobe Illustrator</li>
                  <li>• Adobe InDesign</li>
                  <li>• Logo Design</li>
                  <li>• Print & Digital Design</li>
                </ul>
              </div>
            </div>

            <div className="bg-primary-50 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Choose Our Free IT Courses?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Professional Studio Environment</h4>
                  <p className="text-gray-600 text-sm">Learn in a real news & media studio with professional equipment and industry-standard software.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Experienced Instructors</h4>
                  <p className="text-gray-600 text-sm">Learn from industry experts with real-world experience and proven track records.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Career Support</h4>
                  <p className="text-gray-600 text-sm">Get help with job placement, portfolio building, and career guidance after course completion.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Recognized Certificates</h4>
                  <p className="text-gray-600 text-sm">Receive certificates that are recognized locally and internationally by industry professionals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="application-form" className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Application Form
              </h2>
              <p className="text-xl text-gray-600">
                Fill out this form to apply for a free course
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  ❌ There was an error submitting your application. Please try again or contact us directly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="age_city" className="block text-sm font-medium text-gray-700 mb-2">
                    Age & City *
                  </label>
                  <input
                    type="text"
                    id="age_city"
                    name="age_city"
                    value={formData.age_city}
                    onChange={handleInputChange}
                    placeholder="e.g., 22 years, Lahore"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                    Course Interested In *
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.title}>
                        {course.title} - {course.price}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 mt-1">
                    All courses are available for scholarship students
                  </p>
                </div>

                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you want this free course? *
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    placeholder="Tell us about your situation and why you need this free course..."
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number / WhatsApp *
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="e.g., +92-300-1234567"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Apply for Free Course'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Free IT Courses in Phoolnagar, Multan & Surrounding Areas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📍 Location & Accessibility</h3>
                <p className="text-gray-600 mb-4">
                  Our training facility is conveniently located in Makkah Town Multan Road, Phoolnagar, 
                  making it easily accessible for students from Multan, Khanewal, and surrounding areas.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Easy access from Multan city center</li>
                  <li>• Close to public transportation</li>
                  <li>• Safe and secure environment</li>
                  <li>• Professional studio facilities</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Who Can Apply</h3>
                <p className="text-gray-600 mb-4">
                  Our free IT courses are specifically designed for students who face financial barriers 
                  to quality education and career development.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Orphans and orphanage students</li>
                  <li>• Students with disabilities</li>
                  <li>• Students from low-income families</li>
                  <li>• Unemployed youth seeking skills</li>
                  <li>• Students without income sources</li>
                </ul>
              </div>
            </div>

            <div className="bg-primary-600 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Join Hundreds of Students Who Got Free IT Education
              </h3>
              <p className="text-lg mb-6 text-primary-100">
                Don't let financial constraints hold you back from learning valuable IT skills. 
                Apply now for our free courses and start building your career today.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">100+</div>
                  <div className="text-primary-200">Students Trained</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">6</div>
                  <div className="text-primary-200">Free Courses Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">95%</div>
                  <div className="text-primary-200">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Important Notice
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>We are not a registered NGO.</strong> We are an IT Institute supporting deserving students with free courses. 
                Selection depends on available seats & resources. We reserve the right to verify the information provided 
                and may request supporting documents.
              </p>
              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <p className="text-primary-800 font-medium">
                  💡 <strong>Tip:</strong> Be honest and detailed in your application. 
                  We prioritize students who genuinely need financial assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-500 to-accent-500 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Don't let financial constraints hold you back. Apply for our free IT courses and start building your career today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToForm}
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
            >
              Apply Now
            </button>
            <Link href="/courses" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg">
              View All Courses
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
