// Data store for Unique Skills Lab with localStorage persistence
// Note: For production, replace with a real backend like Firebase, Supabase, or Vercel KV

// Default categories
const defaultCategories = [
  { id: 1, name: 'IT' },
  { id: 2, name: 'Media' }
];

// Default data
const defaultCourses = [
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
  }
];

const defaultInstructors = [
  {
    id: 1,
    name: "Ahmed Khan",
    biography: "Ahmed is a certified digital marketing specialist with 8+ years of experience in social media marketing and brand development. He has helped over 50 businesses grow their online presence.",
    photoUrl: "/assets/instructor-ahmed-khan.jpg",
    courses: [1],
    specialization: "Digital Marketing & Social Media"
  },
  {
    id: 2,
    name: "Sara Ahmed",
    biography: "Sara is a senior mobile app developer with expertise in React Native and Flutter. She has developed 20+ apps for various industries and loves teaching beginners.",
    photoUrl: "/assets/instructor-sara-ahmed.jpg",
    courses: [2],
    specialization: "Mobile App Development"
  },
  {
    id: 3,
    name: "Muhammad Ali",
    biography: "Muhammad is a professional video editor with 10+ years in the film and media industry. He has worked on documentaries, commercials, and feature films.",
    photoUrl: "/assets/instructor-muhammad-ali.jpg",
    courses: [3],
    specialization: "Video Editing & Post Production"
  },
  {
    id: 4,
    name: "Fatima Zahra",
    biography: "Fatima is a former news anchor with 6 years of broadcasting experience. She specializes in communication skills and media presentation techniques.",
    photoUrl: "/assets/instructor-fatima-zahra.jpg",
    courses: [4],
    specialization: "News Anchoring & Communication"
  }
];

// Initialize data from localStorage or use defaults
let courses = [];
let instructors = [];
let contactMessages = [];
let categories = [];

// Load data from localStorage
const loadDataFromStorage = () => {
  try {
    if (typeof window !== 'undefined') {
      const storedCourses = localStorage.getItem('usl_courses');
      const storedInstructors = localStorage.getItem('usl_instructors');
      const storedMessages = localStorage.getItem('usl_contactMessages');
      const storedCategories = localStorage.getItem('usl_categories');
      
      courses = storedCourses ? JSON.parse(storedCourses) : defaultCourses;
      instructors = storedInstructors ? JSON.parse(storedInstructors) : defaultInstructors;
      categories = storedCategories ? JSON.parse(storedCategories) : defaultCategories;
      contactMessages = storedMessages ? JSON.parse(storedMessages) : [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          phone: "+92 300 1234567",
          message: "I'm interested in the Digital Marketing course. Can you provide more details about the schedule?",
          status: "pending",
          createdAt: new Date('2024-01-15T10:30:00').toISOString(),
          respondedAt: null,
          response: ""
        },
        {
          id: 2,
          name: "Sarah Smith",
          email: "sarah@example.com",
          phone: "+92 301 9876543",
          message: "Great courses! I'd like to enroll in the Mobile App Development program.",
          status: "responded",
          createdAt: new Date('2024-01-14T14:20:00').toISOString(),
          respondedAt: new Date('2024-01-15T09:15:00').toISOString(),
          response: "Thank you for your interest! We'll contact you soon with enrollment details."
        }
      ];
    } else {
      // Server-side fallback
      courses = defaultCourses;
      instructors = defaultInstructors;
      categories = defaultCategories;
      contactMessages = [];
    }
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    // Fallback to default data
    courses = defaultCourses;
    instructors = defaultInstructors;
    categories = defaultCategories;
    contactMessages = [];
  }
};

// Save data to localStorage
const saveDataToStorage = () => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('usl_courses', JSON.stringify(courses));
      localStorage.setItem('usl_instructors', JSON.stringify(instructors));
      localStorage.setItem('usl_categories', JSON.stringify(categories));
      localStorage.setItem('usl_contactMessages', JSON.stringify(contactMessages));
    }
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

// Initialize data
loadDataFromStorage();

// Course management functions
export const getCourses = () => {
  return courses.map(course => ({
    ...course,
    instructor: instructors.find(instructor => instructor.id === course.instructorId)
  }));
};

export const getCourseById = (id) => {
  const course = courses.find(course => course.id === id);
  if (course) {
    return {
      ...course,
      instructor: instructors.find(instructor => instructor.id === course.instructorId)
    };
  }
  return null;
};

export const addCourse = (courseData) => {
  const newCourse = {
    id: Math.max(...courses.map(c => c.id)) + 1,
    ...courseData,
    instructorId: courseData.instructorId ? parseInt(courseData.instructorId) : null,
    learningOutcomes: courseData.learningOutcomes || [],
    courseStructure: courseData.courseStructure || [],
    pdfLink: courseData.pdfLink || ''
  };
  courses.push(newCourse);
  saveDataToStorage();
  return newCourse;
};

export const updateCourse = (id, courseData) => {
  const index = courses.findIndex(course => course.id === id);
  if (index !== -1) {
    courses[index] = { 
      ...courses[index], 
      ...courseData, 
      id: parseInt(id),
      instructorId: courseData.instructorId ? parseInt(courseData.instructorId) : courses[index].instructorId,
      learningOutcomes: courseData.learningOutcomes || courses[index].learningOutcomes,
      courseStructure: courseData.courseStructure || courses[index].courseStructure,
      pdfLink: courseData.pdfLink || courses[index].pdfLink
    };
    saveDataToStorage();
    return courses[index];
  }
  return null;
};

export const deleteCourse = (id) => {
  const index = courses.findIndex(course => course.id === id);
  if (index !== -1) {
    courses.splice(index, 1);
    saveDataToStorage();
    return true;
  }
  return false;
};

// Instructor management functions
export const getInstructors = () => {
  return instructors.map(instructor => ({
    ...instructor,
    courses: courses.filter(course => instructor.courses.includes(course.id))
  }));
};

export const getInstructorById = (id) => {
  const instructor = instructors.find(instructor => instructor.id === id);
  if (instructor) {
    return {
      ...instructor,
      courses: courses.filter(course => instructor.courses.includes(course.id))
    };
  }
  return null;
};

export const addInstructor = (instructorData) => {
  const newInstructor = {
    id: Math.max(...instructors.map(i => i.id)) + 1,
    ...instructorData,
    courses: instructorData.courses && Array.isArray(instructorData.courses) ? instructorData.courses.map(Number) : []
  };
  instructors.push(newInstructor);
  saveDataToStorage();
  return newInstructor;
};

export const updateInstructor = (id, instructorData) => {
  const index = instructors.findIndex(instructor => instructor.id === id);
  if (index !== -1) {
    instructors[index] = { 
      ...instructors[index], 
      ...instructorData, 
      id: parseInt(id),
      courses: instructorData.courses && Array.isArray(instructorData.courses) ? instructorData.courses.map(Number) : instructors[index].courses
    };
    saveDataToStorage();
    return instructors[index];
  }
  return null;
};

export const deleteInstructor = (id) => {
  const index = instructors.findIndex(instructor => instructor.id === id);
  if (index !== -1) {
    instructors.splice(index, 1);
    saveDataToStorage();
    return true;
  }
  return false;
};

// Get courses by category
export const getCoursesByCategory = (category) => {
  return getCourses().filter(course => course.category === category);
};

// Category management functions
export const getCategories = () => {
  loadDataFromStorage();
  return categories;
};

export const getCategoryById = (id) => {
  loadDataFromStorage();
  return categories.find(cat => cat.id === parseInt(id));
};

export const addCategory = (categoryData) => {
  loadDataFromStorage();
  const newCategory = {
    id: Math.max(...categories.map(c => c.id), 0) + 1,
    name: categoryData.name,
    createdAt: new Date().toISOString()
  };
  categories.push(newCategory);
  saveDataToStorage();
  return newCategory;
};

export const updateCategory = (id, categoryData) => {
  loadDataFromStorage();
  const index = categories.findIndex(cat => cat.id === parseInt(id));
  if (index !== -1) {
    categories[index] = { ...categories[index], ...categoryData };
    saveDataToStorage();
    return categories[index];
  }
  return null;
};

export const deleteCategory = (id) => {
  loadDataFromStorage();
  const index = categories.findIndex(cat => cat.id === parseInt(id));
  if (index !== -1) {
    const deletedCategory = categories.splice(index, 1)[0];
    
    // Update courses that were using this category to use the first available category
    const fallbackCategory = categories.length > 0 ? categories[0].name : 'General';
    courses.forEach(course => {
      if (course.category === deletedCategory.name) {
        course.category = fallbackCategory;
      }
    });
    
    saveDataToStorage();
    return deletedCategory;
  }
  return null;
};

// Get all course categories (for backward compatibility)
export const getCourseCategories = () => {
  return [...new Set(courses.map(course => course.category))];
};



// Contact Messages Management Functions
export const getContactMessages = () => {
  return contactMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getContactMessageById = (id) => {
  return contactMessages.find(message => message.id === id);
};

export const addContactMessage = (messageData) => {
  const newMessage = {
    id: Math.max(...contactMessages.map(m => m.id)) + 1,
    ...messageData,
    status: "pending",
    createdAt: new Date(),
    respondedAt: null,
    response: ""
  };
  contactMessages.push(newMessage);
  saveDataToStorage();
  return newMessage;
};

export const updateContactMessage = (id, messageData) => {
  const index = contactMessages.findIndex(message => message.id === id);
  if (index !== -1) {
    const updatedMessage = {
      ...contactMessages[index],
      ...messageData,
      id: parseInt(id)
    };
    
    // If status is being changed to responded, set respondedAt
    if (messageData.status === "responded" && contactMessages[index].status !== "responded") {
      updatedMessage.respondedAt = new Date();
    }
    
    contactMessages[index] = updatedMessage;
    saveDataToStorage();
    return contactMessages[index];
  }
  return null;
};

export const deleteContactMessage = (id) => {
  const index = contactMessages.findIndex(message => message.id === id);
  if (index !== -1) {
    contactMessages.splice(index, 1);
    saveDataToStorage();
    return true;
  }
  return false;
};

export const getMessagesByStatus = (status) => {
  return contactMessages.filter(message => message.status === status);
};

export const getMessageStats = () => {
  const total = contactMessages.length;
  const pending = contactMessages.filter(m => m.status === "pending").length;
  const responded = contactMessages.filter(m => m.status === "responded").length;
  const closed = contactMessages.filter(m => m.status === "closed").length;
  
  return { total, pending, responded, closed };
};

// Utility function to reset data to defaults
export const resetDataToDefaults = () => {
  courses = [...defaultCourses];
  instructors = [...defaultInstructors];
  categories = [...defaultCategories];
  contactMessages = [];
  saveDataToStorage();
};

// Utility function to clear all data
export const clearAllData = () => {
  courses = [];
  instructors = [];
  categories = [];
  contactMessages = [];
  saveDataToStorage();
};
