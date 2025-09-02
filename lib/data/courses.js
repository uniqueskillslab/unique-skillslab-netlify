// Courses data - this will persist across deployments
export const courses = [
  {
    id: 1,
    title: "Digital Marketing & Social Media Specialist",
    description: "Master social media strategies and digital marketing tools. Learn to create engaging content, run effective campaigns, and grow online presence for businesses.",
    category: "Media",
    duration: "3 months",
    price: "25,000 PKR",
    instructorId: 1,
    image: "/assets/course-digital-marketing.jpg",
    pdfLink: "/assets/course-digital-marketing.pdf",
    learningOutcomes: [
      "Master social media marketing strategies",
      "Create engaging content for different platforms",
      "Run effective digital marketing campaigns",
      "Analyze campaign performance and metrics",
      "Build and grow online brand presence",
      "Understand SEO and content marketing"
    ],
    courseStructure: [
      { title: "Foundation Skills", description: "Introduction to digital marketing and social media", duration: "2 weeks" },
      { title: "Content Creation", description: "Creating engaging content for various platforms", duration: "4 weeks" },
      { title: "Campaign Management", description: "Planning and executing marketing campaigns", duration: "4 weeks" },
      { title: "Analytics & Optimization", description: "Measuring success and improving performance", duration: "2 weeks" }
    ]
  },
  {
    id: 2,
    title: "Mobile App Development (Beginner Level)",
    description: "Build your first mobile apps with hands-on projects. Learn React Native, Flutter, and mobile development fundamentals.",
    category: "IT",
    duration: "4 months",
    price: "30,000 PKR",
    instructorId: 2,
    image: "/assets/course-app-development.jpg",
    pdfLink: "/assets/course-app-development.pdf",
    learningOutcomes: [
      "Master modern programming languages and frameworks",
      "Build real-world mobile applications",
      "Understand software development lifecycle",
      "Learn industry best practices and coding standards",
      "Develop problem-solving and analytical thinking",
      "Create portfolio-worthy projects"
    ],
    courseStructure: [
      { title: "Fundamentals & Setup", description: "Introduction to development environment and basic concepts", duration: "2 weeks" },
      { title: "Core Programming", description: "Learning programming languages and frameworks", duration: "6 weeks" },
      { title: "Project Development", description: "Building real applications and solving problems", duration: "4 weeks" },
      { title: "Testing & Deployment", description: "Quality assurance and launching applications", duration: "2 weeks" }
    ]
  },
  {
    id: 3,
    title: "Video Editing & Post Production",
    description: "Learn professional video editing in a real studio setup. Master Adobe Premiere Pro, After Effects, and post-production techniques.",
    category: "Media",
    duration: "3 months",
    price: "28,000 PKR",
    instructorId: 3,
    image: "/assets/course-video-editing.jpg",
    pdfLink: "/assets/course-video-editing.pdf",
    learningOutcomes: [
      "Master professional video editing software",
      "Create engaging social media content",
      "Develop strong communication skills",
      "Learn broadcasting and presentation techniques",
      "Understand digital marketing strategies",
      "Build a professional media portfolio"
    ],
    courseStructure: [
      { title: "Foundation Skills", description: "Basic concepts and software introduction", duration: "2 weeks" },
      { title: "Core Techniques", description: "Advanced editing and production methods", duration: "6 weeks" },
      { title: "Project Work", description: "Creating professional content and portfolios", duration: "4 weeks" },
      { title: "Industry Preparation", description: "Career guidance and industry insights", duration: "2 weeks" }
    ]
  },
  {
    id: 4,
    title: "News Anchoring & Mass Communication Basics",
    description: "Gain skills in news presentation and communication. Learn broadcasting techniques, script writing, and on-camera confidence.",
    category: "Media",
    duration: "2 months",
    price: "22,000 PKR",
    instructorId: 4,
    image: "/assets/course-news-anchoring.jpg",
    pdfLink: "/assets/course-news-anchoring.pdf",
    learningOutcomes: [
      "Master news presentation and anchoring skills",
      "Develop strong communication abilities",
      "Learn script writing and broadcasting techniques",
      "Build on-camera confidence and presence",
      "Understand media ethics and journalism principles",
      "Create professional broadcasting portfolio"
    ],
    courseStructure: [
      { title: "Communication Basics", description: "Fundamental communication and presentation skills", duration: "2 weeks" },
      { title: "Broadcasting Techniques", description: "News anchoring and presentation methods", duration: "4 weeks" },
      { title: "Script Writing", description: "Writing news scripts and content", duration: "2 weeks" },
      { title: "Studio Practice", description: "Real studio experience and portfolio building", duration: "2 weeks" }
    ]
  },
  {
    id: 5,
    title: "Computer Fundamentals & Office Applications",
    description: "This course is designed for beginners to build a strong foundation in computer usage, Microsoft Office, and essential IT skills. It will help students improve their digital literacy and prepare them for both academic and professional needs.",
    category: "Computer Short Course",
    duration: "3 months",
    price: "8,000 PKR",
    instructorId: null,
    image: "/assets/course-computer-fundamentals.png",
    pdfLink: "/assets/course-computer-fundamentals.pdf",
    learningOutcomes: [
      "Understand basic computer hardware and software",
      "Master Microsoft Word for professional documents",
      "Create and manage spreadsheets in Excel",
      "Design effective presentations using PowerPoint",
      "Learn internet browsing, email handling, and online safety",
      "Gain typing speed and accuracy"
    ],
    courseStructure: [
      { title: "Introduction to Computers", description: "Basic hardware, software, and operating system concepts", duration: "2 weeks" },
      { title: "MS Word", description: "Creating, formatting, and editing professional documents", duration: "3 weeks" },
      { title: "MS Excel", description: "Working with formulas, charts, and data management", duration: "4 weeks" },
      { title: "MS PowerPoint", description: "Designing and presenting impactful slides", duration: "2 weeks" },
      { title: "Internet & Email", description: "Browsing, communication, and cybersecurity basics", duration: "2 weeks" }
    ]
  }
];
