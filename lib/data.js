// Data store for Unique Skills Lab with localStorage persistence
// Note: For production, replace with a real backend like Firebase, Supabase, or Vercel KV

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
    image: "/assets/course-digital-marketing.jpg"
  },
  {
    id: 2,
    title: "Mobile App Development (Beginner Level)",
    description: "Build your first mobile apps with hands-on projects. Learn React Native, Flutter, and mobile development fundamentals.",
    category: "IT",
    duration: "4 months",
    price: "30,000 PKR",
    instructorId: 2,
    image: "/assets/course-app-development.jpg"
  },
  {
    id: 3,
    title: "Video Editing & Post Production",
    description: "Learn professional video editing in a real studio setup. Master Adobe Premiere Pro, After Effects, and post-production techniques.",
    category: "Media",
    duration: "3 months",
    price: "28,000 PKR",
    instructorId: 3,
    image: "/assets/course-video-editing.jpg"
  },
  {
    id: 4,
    title: "News Anchoring & Mass Communication Basics",
    description: "Gain skills in news presentation and communication. Learn broadcasting techniques, script writing, and on-camera confidence.",
    category: "Media",
    duration: "2 months",
    price: "22,000 PKR",
    instructorId: 4,
    image: "/assets/course-news-anchoring.jpg"
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

// Load data from localStorage
const loadDataFromStorage = () => {
  try {
    if (typeof window !== 'undefined') {
      const storedCourses = localStorage.getItem('usl_courses');
      const storedInstructors = localStorage.getItem('usl_instructors');
      const storedMessages = localStorage.getItem('usl_contactMessages');
      
      courses = storedCourses ? JSON.parse(storedCourses) : defaultCourses;
      instructors = storedInstructors ? JSON.parse(storedInstructors) : defaultInstructors;
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
      contactMessages = [];
    }
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    // Fallback to default data
    courses = defaultCourses;
    instructors = defaultInstructors;
    contactMessages = [];
  }
};

// Save data to localStorage
const saveDataToStorage = () => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('usl_courses', JSON.stringify(courses));
      localStorage.setItem('usl_instructors', JSON.stringify(instructors));
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
    instructorId: courseData.instructorId ? parseInt(courseData.instructorId) : null
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
      instructorId: courseData.instructorId ? parseInt(courseData.instructorId) : courses[index].instructorId
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

// Get all categories
export const getCategories = () => {
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
  contactMessages = [];
  saveDataToStorage();
};

// Utility function to clear all data
export const clearAllData = () => {
  courses = [];
  instructors = [];
  contactMessages = [];
  saveDataToStorage();
};
