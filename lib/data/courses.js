// Courses data - this will persist across deployments
export const courses = [
  {
    id: 1,
    title: "Computer Basics",
    description: "Introduction to essential computer skills for beginners.",
    category: "IT",
    duration: "3 months",
    price: "8,000 PKR",
    instructorId: 1,
    schedule: "Fri, Sat, Sun",
    time: "01:00 PM - 04:00 PM",
    prerequisites: "None",
    image: "/assets/course-computer-basics.jpg",
    pdfLink: "/assets/course-computer-basics.pdf",
    learningOutcomes: [
      "Understand basic computer hardware and software",
      "Master essential computer operations",
      "Learn file management and organization",
      "Develop basic troubleshooting skills",
      "Gain confidence in computer usage"
    ],
    courseStructure: [
      { title: "Computer Fundamentals", description: "Hardware, software, and operating system basics", duration: "1 week" },
      { title: "File Management", description: "Organizing and managing files and folders", duration: "1 week" },
      { title: "Internet Basics", description: "Web browsing, email, and online safety", duration: "1 week" },
      { title: "Practical Applications", description: "Real-world computer usage scenarios", duration: "1 week" }
    ]
  },
  {
    id: 2,
    title: "Video Editing",
    description: "Learn professional video editing techniques using industry-standard tools.",
    category: "Media",
    duration: "2 months",
    price: "25,000 PKR",
    instructorId: 1,
    schedule: "Fri, Sat, Sun",
    time: "02:00 PM - 05:00 PM",
    prerequisites: "Basic computer skills",
    image: "/assets/course-video-editing.jpg",
    pdfLink: "/assets/course-video-editing.pdf",
    learningOutcomes: [
      "Master professional video editing software",
      "Create engaging video content",
      "Learn color correction and audio editing",
      "Understand video formats and compression",
      "Build a professional video portfolio"
    ],
    courseStructure: [
      { title: "Software Introduction", description: "Adobe Premiere Pro and After Effects basics", duration: "1 week" },
      { title: "Editing Techniques", description: "Cutting, transitions, and effects", duration: "1 week" },
      { title: "Advanced Features", description: "Color grading, audio mixing, and motion graphics", duration: "1 week" },
      { title: "Project Work", description: "Creating professional video projects", duration: "1 week" }
    ]
  },
  {
    id: 3,
    title: "Graphic Design",
    description: "Master graphic design principles and software like Adobe Suite.",
    category: "Design",
    duration: "3 months",
    price: "30,000 PKR",
    instructorId: 1,
    schedule: "Fri, Sat, Sun",
    time: "03:00 PM - 06:00 PM",
    prerequisites: "None",
    image: "/assets/course-graphic-design.jpg",
    pdfLink: "/assets/course-graphic-design.pdf",
    learningOutcomes: [
      "Master Adobe Creative Suite",
      "Understand design principles and typography",
      "Create professional logos and branding",
      "Learn print and digital design",
      "Build a comprehensive design portfolio"
    ],
    courseStructure: [
      { title: "Design Fundamentals", description: "Principles, color theory, and typography", duration: "1 week" },
      { title: "Adobe Photoshop", description: "Image editing and manipulation", duration: "1 week" },
      { title: "Adobe Illustrator", description: "Vector graphics and logo design", duration: "1 week" },
      { title: "Adobe InDesign", description: "Layout and print design", duration: "1 week" },
      { title: "Portfolio Development", description: "Creating professional design portfolio", duration: "1 week" }
    ]
  },
  {
    id: 4,
    title: "TikTok Master Course",
    description: "Strategies to grow and monetize on TikTok.",
    category: "Influencer",
    duration: "3 months",
    price: "30,000 PKR",
    instructorId: 1,
    schedule: "Wed, Thu",
    time: "04:00 PM - 07:00 PM",
    prerequisites: "Basic social media",
    image: "/assets/course-tiktok-master.jpg",
    pdfLink: "/assets/course-tiktok-master.pdf",
    learningOutcomes: [
      "Master TikTok algorithm and content optimization",
      "Learn viral content creation strategies",
      "Understand monetization methods",
      "Build engaged follower base",
      "Create sustainable TikTok income"
    ],
    courseStructure: [
      { title: "TikTok Fundamentals", description: "Platform basics and account optimization", duration: "1 week" },
      { title: "Content Creation", description: "Video production and editing for TikTok", duration: "1 week" },
      { title: "Growth Strategies", description: "Algorithm mastery and engagement tactics", duration: "1 week" },
      { title: "Monetization", description: "Creator Fund, partnerships, and revenue streams", duration: "1 week" }
    ]
  },
  {
    id: 5,
    title: "Internship",
    description: "Hands-on experience in various fields with mentorship.",
    category: "Internship",
    duration: "3/6 months",
    price: "20,000 PKR",
    instructorId: 2,
    schedule: "Mon - Thu (Fri OFF)",
    time: "09:00 AM - 05:00 PM",
    prerequisites: "Relevant coursework",
    image: "/assets/course-internship.jpg",
    pdfLink: "/assets/course-internship.pdf",
    learningOutcomes: [
      "Gain real-world industry experience",
      "Work on live projects with mentorship",
      "Develop professional skills",
      "Build industry connections",
      "Create impressive portfolio"
    ],
    courseStructure: [
      { title: "Orientation", description: "Company culture and project introduction", duration: "1 week" },
      { title: "Project Work", description: "Hands-on experience with real projects", duration: "1 week" },
      { title: "Portfolio Development", description: "Documenting and presenting work", duration: "1 week" },
      { title: "Mentorship", description: "Regular guidance and feedback sessions", duration: "1 week" }
    ]
  },
  {
    id: 6,
    title: "Basic Coding",
    description: "Fundamentals of coding logic and basic languages C++ OOP python",
    category: "Programming",
    duration: "1 month",
    price: "5,000 PKR",
    instructorId: 3,
    schedule: "Mon, Tue",
    time: "09:00 AM - 12:00 PM",
    prerequisites: "None",
    image: "/assets/course-basic-coding.jpg",
    pdfLink: "/assets/course-basic-coding.pdf",
    learningOutcomes: [
      "Master C++ programming fundamentals",
      "Understand Object-Oriented Programming (OOP) concepts",
      "Learn Python programming basics",
      "Develop problem-solving and algorithmic thinking",
      "Create simple programs and applications",
      "Prepare for advanced programming courses"
    ],
    courseStructure: [
      { title: "C++ Fundamentals", description: "Basic syntax, variables, and control structures", duration: "1 week" },
      { title: "Object-Oriented Programming", description: "Classes, objects, inheritance, and polymorphism", duration: "1 week" },
      { title: "Python Basics", description: "Introduction to Python programming language", duration: "1 week" },
      { title: "Project Work", description: "Building simple applications using C++ and Python", duration: "1 week" }
    ]
  },
  {
    id: 7,
    title: "App Development",
    description: "Build mobile apps from scratch using modern frameworks.",
    category: "Development",
    duration: "3 months",
    price: "24,999 PKR",
    instructorId: 3,
    schedule: "Mon, Tue",
    time: "10:00 AM - 01:00 PM",
    prerequisites: "Basic coding",
    image: "/assets/course-app-development.jpg",
    pdfLink: "/assets/course-app-development.pdf",
    learningOutcomes: [
      "Master mobile app development frameworks",
      "Build cross-platform mobile applications",
      "Understand app deployment and distribution",
      "Learn app store optimization",
      "Create portfolio-worthy mobile apps"
    ],
    courseStructure: [
      { title: "Framework Introduction", description: "React Native and Flutter basics", duration: "1 week" },
      { title: "UI/UX Design", description: "Mobile interface design principles", duration: "1 week" },
      { title: "App Development", description: "Building complete mobile applications", duration: "1 week" },
      { title: "Testing & Deployment", description: "App testing and store submission", duration: "1 week" }
    ]
  },
  {
    id: 8,
    title: "Web Development",
    description: "Create dynamic websites with front-end and back-end technologies.",
    category: "Development",
    duration: "3 months",
    price: "24,999 PKR",
    instructorId: 3,
    schedule: "Mon, Tue",
    time: "11:00 AM - 02:00 PM",
    prerequisites: "Basic coding",
    image: "/assets/course-web-development.jpg",
    pdfLink: "/assets/course-web-development.pdf",
    learningOutcomes: [
      "Master front-end and back-end development",
      "Build responsive and dynamic websites",
      "Understand databases and server management",
      "Learn modern web frameworks",
      "Create full-stack web applications"
    ],
    courseStructure: [
      { title: "Frontend Development", description: "HTML, CSS, JavaScript, and React", duration: "1 week" },
      { title: "Backend Development", description: "Node.js, Express, and database integration", duration: "1 week" },
      { title: "Full-Stack Integration", description: "Connecting frontend and backend", duration: "1 week" },
      { title: "Deployment", description: "Hosting and domain management", duration: "1 week" }
    ]
  },
  {
    id: 9,
    title: "Digital Marketing",
    description: "SEO, content strategy, and online advertising essentials.",
    category: "Marketing",
    duration: "3 months",
    price: "24,999 PKR",
    instructorId: 3,
    schedule: "Wed, Thu",
    time: "05:00 PM - 08:00 PM",
    prerequisites: "None",
    image: "/assets/course-digital-marketing.jpg",
    pdfLink: "/assets/course-digital-marketing.pdf",
    learningOutcomes: [
      "Master SEO and content marketing",
      "Learn social media advertising",
      "Understand analytics and metrics",
      "Create effective marketing campaigns",
      "Build online brand presence"
    ],
    courseStructure: [
      { title: "SEO Fundamentals", description: "Search engine optimization basics", duration: "1 week" },
      { title: "Content Strategy", description: "Creating engaging content", duration: "1 week" },
      { title: "Social Media Marketing", description: "Platform-specific strategies", duration: "1 week" },
      { title: "Analytics & Optimization", description: "Measuring and improving performance", duration: "1 week" }
    ]
  },
  {
    id: 10,
    title: "Facebook Monetization",
    description: "Techniques to earn revenue through Facebook content.",
    category: "Influencer",
    duration: "3 months",
    price: "24,999 PKR",
    instructorId: 3,
    schedule: "Wed, Thu",
    time: "03:00 PM - 06:00 PM",
    prerequisites: "Basic social media",
    image: "/assets/course-facebook-monetization.jpg",
    pdfLink: "/assets/course-facebook-monetization.pdf",
    learningOutcomes: [
      "Master Facebook monetization strategies",
      "Learn content creation for Facebook",
      "Understand Facebook algorithm",
      "Build engaged Facebook audience",
      "Create sustainable Facebook income"
    ],
    courseStructure: [
      { title: "Facebook Basics", description: "Platform features and optimization", duration: "1 week" },
      { title: "Content Creation", description: "Creating engaging Facebook content", duration: "1 week" },
      { title: "Monetization Methods", description: "Facebook Creator Fund and partnerships", duration: "1 week" },
      { title: "Growth Strategies", description: "Building audience and engagement", duration: "1 week" }
    ]
  },
  {
    id: 11,
    title: "YouTube Monetization",
    description: "Grow your channel and monetize videos effectively.",
    category: "Influencer",
    duration: "3 months",
    price: "24,999 PKR",
    instructorId: 3,
    schedule: "Wed, Thu",
    time: "03:00 PM - 06:00 PM",
    prerequisites: "Basic social media",
    image: "/assets/course-youtube-monetization.jpg",
    pdfLink: "/assets/course-youtube-monetization.pdf",
    learningOutcomes: [
      "Master YouTube monetization strategies",
      "Learn video production and editing",
      "Understand YouTube algorithm",
      "Build engaged subscriber base",
      "Create sustainable YouTube income"
    ],
    courseStructure: [
      { title: "YouTube Fundamentals", description: "Channel setup and optimization", duration: "1 week" },
      { title: "Video Production", description: "Creating high-quality videos", duration: "1 week" },
      { title: "Monetization", description: "AdSense, sponsorships, and memberships", duration: "1 week" },
      { title: "Growth Strategies", description: "SEO, thumbnails, and audience building", duration: "1 week" }
    ]
  },
  {
    id: 12,
    title: "Free Freelancing",
    description: "Canva and online Platform",
    category: "Social Media",
    duration: "1 week",
    price: "0 PKR",
    instructorId: 4,
    schedule: "After Complete Course",
    time: "Not Fixed",
    prerequisites: "Online Earning",
    image: "/assets/course-freelancing.jpg",
    pdfLink: "/assets/course-freelancing.pdf",
    learningOutcomes: [
      "Master Canva for design work",
      "Learn online freelancing platforms",
      "Understand client communication",
      "Build freelancing portfolio",
      "Start earning online immediately"
    ],
    courseStructure: [
      { title: "Canva Mastery", description: "Design tools and templates", duration: "1 week" },
      { title: "Freelance Platforms", description: "Upwork, Fiverr, and other platforms", duration: "1 week" },
      { title: "Client Management", description: "Communication and project management", duration: "1 week" },
      { title: "Portfolio Building", description: "Creating winning proposals", duration: "1 week" }
    ]
  }
];
