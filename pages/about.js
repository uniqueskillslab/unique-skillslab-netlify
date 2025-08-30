import Head from 'next/head'

export default function About() {
  const taglines = [
    "Practical Training for Real Careers.",
    "Learn. Create. Succeed.",
    "Where Media Meets Technology.",
    "Skills Today, Success Tomorrow.",
    "Building Careers, One Skill at a Time.",
    "Your Gateway to Digital Excellence."
  ]

  const whyChooseUs = [
    {
      icon: "🎬",
      title: "Real Studio Environment",
      description: "Learn inside a professional news & editing studio with state-of-the-art equipment and facilities."
    },
    {
      icon: "👐",
      title: "Hands-on Training",
      description: "Get practical experience with real projects and industry-standard tools and software."
    },
    {
      icon: "🏆",
      title: "Recognized Certificates",
      description: "Receive certificates that are recognized locally and internationally by industry professionals."
    },
    {
      icon: "👨‍🏫",
      title: "Industry Experts",
      description: "Learn from instructors with real industry experience and proven track records."
    },
    {
      icon: "💼",
      title: "Internship Opportunities",
      description: "Gain valuable work experience through internship opportunities in our media setup."
    },
    {
      icon: "💰",
      title: "Affordable Fees",
      description: "Access quality education at reasonable prices with flexible payment options."
    }
  ]

  const stats = [
    { number: "100+", label: "Students Trained" },
    { number: "4", label: "Specialized Courses" },
    { number: "4", label: "Expert Instructors" },
    { number: "95%", label: "Success Rate" }
  ]

  return (
    <>
      <Head>
        <title>About Us - Unique Skills Lab</title>
        <meta name="description" content="Learn about Unique Skills Lab - a modern training institute built inside a professional news & media studio providing practical IT and Media courses." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-accent-500 text-white pt-20 pb-16">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Unique Skills Lab
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              A modern training institute built inside a professional news & media studio, providing practical skills for real careers
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  Unique Skills Lab is a modern training institute built inside a professional news & media studio. We provide short, practical courses in Media, IT, and Digital Marketing so students can quickly gain the skills needed to succeed in today's digital world.
                </p>
                <p>
                  With experienced instructors, real studio facilities, and hands-on projects, our students graduate with confidence and portfolios that open doors to exciting career opportunities.
                </p>
                <p>
                  Our mission is to bridge the gap between traditional education and industry requirements by offering practical, skill-based training that prepares students for real-world challenges.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg mb-6">
                  To provide practical, industry-relevant training that empowers students with the skills and confidence needed to excel in the digital age.
                </p>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg">
                  To become the leading practical skills training institute, recognized for producing industry-ready professionals who drive innovation and success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Taglines Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Taglines
            </h2>
            <p className="text-xl text-gray-600">
              These phrases capture the essence of what we do and what we stand for
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taglines.map((tagline, index) => (
              <div key={index} className="card text-center group hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  💡
                </div>
                <p className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {tagline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Unique Skills Lab?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the perfect environment for learning practical skills that lead to real career opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="card group hover:shadow-2xl transition-all duration-300">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Environment Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Professional Studio Environment
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  Our training facility is equipped with professional-grade equipment and software used in the industry. Students get hands-on experience with the same tools they'll use in their careers.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3">
                    <span className="text-primary-500">✓</span>
                    <span>Professional video editing suites</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-primary-500">✓</span>
                    <span>Broadcasting equipment</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-primary-500">✓</span>
                    <span>Latest software and tools</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-primary-500">✓</span>
                    <span>Dedicated computer labs</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-accent-500 to-primary-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Real-World Projects</h3>
              <p className="text-lg mb-6">
                Work on actual client projects and build a professional portfolio that showcases your skills to potential employers.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span>🎯</span>
                  <span>Client projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>📁</span>
                  <span>Portfolio building</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>🤝</span>
                  <span>Industry connections</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visit Our Studio
            </h2>
            <p className="text-xl text-gray-600">
              Come see our facilities and meet our team
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">Madina Town Multan Road, Phoolnagar</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <a href="tel:03176100190" className="text-gray-600 hover:text-primary-600 transition-colors">0317-6100190</a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">WhatsApp</h4>
                    <a href="https://wa.me/923296219415" className="text-gray-600 hover:text-primary-600 transition-colors">0329-6219415</a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <a href="mailto:uniqueskillslab@gmail.com" className="text-gray-600 hover:text-primary-600 transition-colors">uniqueskillslab@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Location</h3>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.5!2d73.9667!3d31.3667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDIyJzAwLjAiTiA3M8KwNTgnMDAuMCJF!5e0!3m2!1sen!2spk!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Unique Skills Lab Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-500 to-accent-500 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Take the first step towards your new career. Contact us today to learn more about our courses and enrollment process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/courses" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg">
              Explore Courses
            </a>
            <a href="#contact" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
