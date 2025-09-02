// Data Manager - handles both static data and dynamic localStorage data
import { courses as staticCourses } from './data/courses.js'
import { instructors as staticInstructors } from './data/instructors.js'
import { categories as staticCategories } from './data/categories.js'
import { contactMessages as staticContactMessages } from './data/contactMessages.js'

// Initialize data arrays
let courses = [...staticCourses]
let instructors = [...staticInstructors]
let categories = [...staticCategories]
let contactMessages = [...staticContactMessages]

// Load data from localStorage (for admin changes)
const loadDataFromStorage = () => {
  try {
    if (typeof window !== 'undefined') {
      const storedCourses = localStorage.getItem('usl_courses')
      const storedInstructors = localStorage.getItem('usl_instructors')
      const storedMessages = localStorage.getItem('usl_contactMessages')
      const storedCategories = localStorage.getItem('usl_categories')
      
      // Only use localStorage data if it exists, otherwise use static data
      if (storedCourses) {
        courses = JSON.parse(storedCourses)
      }
      if (storedInstructors) {
        instructors = JSON.parse(storedInstructors)
      }
      if (storedCategories) {
        categories = JSON.parse(storedCategories)
      }
      if (storedMessages) {
        contactMessages = JSON.parse(storedMessages)
      }
    }
  } catch (error) {
    console.error('Error loading data from localStorage:', error)
    // Fallback to static data
    courses = [...staticCourses]
    instructors = [...staticInstructors]
    categories = [...staticCategories]
    contactMessages = [...staticContactMessages]
  }
}

// Save data to localStorage (for admin changes)
const saveDataToStorage = () => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('usl_courses', JSON.stringify(courses))
      localStorage.setItem('usl_instructors', JSON.stringify(instructors))
      localStorage.setItem('usl_categories', JSON.stringify(categories))
      localStorage.setItem('usl_contactMessages', JSON.stringify(contactMessages))
    }
  } catch (error) {
    console.error('Error saving data to localStorage:', error)
  }
}

// Initialize data
loadDataFromStorage()

// Listen for localStorage changes to sync data across tabs/windows
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key && e.key.startsWith('usl_')) {
      loadDataFromStorage()
    }
  })
}

// Course management functions
export const getCourses = () => {
  loadDataFromStorage()
  return courses.map(course => ({
    ...course,
    instructor: instructors.find(instructor => instructor.id === course.instructorId)
  }))
}

export const getCourseById = (id) => {
  loadDataFromStorage()
  const course = courses.find(course => course.id === id)
  if (course) {
    return {
      ...course,
      instructor: instructors.find(instructor => instructor.id === course.instructorId)
    }
  }
  return null
}

export const addCourse = (courseData) => {
  loadDataFromStorage()
  const newCourse = {
    id: Math.max(...courses.map(c => c.id), 0) + 1,
    ...courseData,
    instructorId: courseData.instructorId && courseData.instructorId !== '' ? parseInt(courseData.instructorId) : null,
    learningOutcomes: courseData.learningOutcomes || [],
    courseStructure: courseData.courseStructure || [],
    pdfLink: courseData.pdfLink || ''
  }
  courses.push(newCourse)
  saveDataToStorage()
  return newCourse
}

export const updateCourse = (id, courseData) => {
  loadDataFromStorage()
  const index = courses.findIndex(course => course.id === id)
  if (index !== -1) {
    courses[index] = { 
      ...courses[index], 
      ...courseData, 
      id: parseInt(id),
      instructorId: courseData.instructorId && courseData.instructorId !== '' ? parseInt(courseData.instructorId) : null,
      learningOutcomes: courseData.learningOutcomes || courses[index].learningOutcomes,
      courseStructure: courseData.courseStructure || courses[index].courseStructure,
      pdfLink: courseData.pdfLink || courses[index].pdfLink
    }
    saveDataToStorage()
    return courses[index]
  }
  return null
}

export const deleteCourse = (id) => {
  loadDataFromStorage()
  const index = courses.findIndex(course => course.id === id)
  if (index !== -1) {
    courses.splice(index, 1)
    saveDataToStorage()
    return true
  }
  return false
}

// Instructor management functions
export const getInstructors = () => {
  loadDataFromStorage()
  return instructors.map(instructor => ({
    ...instructor,
    courses: courses.filter(course => instructor.courses.includes(course.id))
  }))
}

export const getInstructorById = (id) => {
  loadDataFromStorage()
  const instructor = instructors.find(instructor => instructor.id === id)
  if (instructor) {
    return {
      ...instructor,
      courses: courses.filter(course => instructor.courses.includes(course.id))
    }
  }
  return null
}

export const addInstructor = (instructorData) => {
  loadDataFromStorage()
  const newInstructor = {
    id: Math.max(...instructors.map(i => i.id), 0) + 1,
    ...instructorData,
    courses: instructorData.courses && Array.isArray(instructorData.courses) ? instructorData.courses.map(Number) : []
  }
  instructors.push(newInstructor)
  saveDataToStorage()
  return newInstructor
}

export const updateInstructor = (id, instructorData) => {
  loadDataFromStorage()
  const index = instructors.findIndex(instructor => instructor.id === id)
  if (index !== -1) {
    instructors[index] = { 
      ...instructors[index], 
      ...instructorData, 
      id: parseInt(id),
      courses: instructorData.courses && Array.isArray(instructorData.courses) ? instructorData.courses.map(Number) : instructors[index].courses
    }
    saveDataToStorage()
    return instructors[index]
  }
  return null
}

export const deleteInstructor = (id) => {
  loadDataFromStorage()
  const index = instructors.findIndex(instructor => instructor.id === id)
  if (index !== -1) {
    instructors.splice(index, 1)
    saveDataToStorage()
    return true
  }
  return false
}

// Category management functions
export const getCategories = () => {
  loadDataFromStorage()
  return categories
}

export const getCategoryById = (id) => {
  loadDataFromStorage()
  return categories.find(cat => cat.id === parseInt(id))
}

export const addCategory = (categoryData) => {
  loadDataFromStorage()
  const newCategory = {
    id: Math.max(...categories.map(c => c.id), 0) + 1,
    name: categoryData.name,
    createdAt: new Date().toISOString()
  }
  categories.push(newCategory)
  saveDataToStorage()
  return newCategory
}

export const updateCategory = (id, categoryData) => {
  loadDataFromStorage()
  const index = categories.findIndex(cat => cat.id === parseInt(id))
  if (index !== -1) {
    categories[index] = { ...categories[index], ...categoryData }
    saveDataToStorage()
    return categories[index]
  }
  return null
}

export const deleteCategory = (id) => {
  loadDataFromStorage()
  const index = categories.findIndex(cat => cat.id === parseInt(id))
  if (index !== -1) {
    const deletedCategory = categories.splice(index, 1)[0]
    
    // Update courses that were using this category to use the first available category
    const fallbackCategory = categories.length > 0 ? categories[0].name : 'General'
    courses.forEach(course => {
      if (course.category === deletedCategory.name) {
        course.category = fallbackCategory
      }
    })
    
    saveDataToStorage()
    return deletedCategory
  }
  return null
}

// Contact Messages Management Functions
export const getContactMessages = () => {
  loadDataFromStorage()
  return contactMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export const getContactMessageById = (id) => {
  loadDataFromStorage()
  return contactMessages.find(message => message.id === id)
}

export const addContactMessage = (messageData) => {
  loadDataFromStorage()
  const newMessage = {
    id: Math.max(...contactMessages.map(m => m.id), 0) + 1,
    ...messageData,
    status: "pending",
    createdAt: new Date(),
    respondedAt: null,
    response: ""
  }
  contactMessages.push(newMessage)
  saveDataToStorage()
  return newMessage
}

export const updateContactMessage = (id, messageData) => {
  loadDataFromStorage()
  const index = contactMessages.findIndex(message => message.id === id)
  if (index !== -1) {
    const updatedMessage = {
      ...contactMessages[index],
      ...messageData,
      id: parseInt(id)
    }
    
    // If status is being changed to responded, set respondedAt
    if (messageData.status === "responded" && contactMessages[index].status !== "responded") {
      updatedMessage.respondedAt = new Date()
    }
    
    contactMessages[index] = updatedMessage
    saveDataToStorage()
    return contactMessages[index]
  }
  return null
}

export const deleteContactMessage = (id) => {
  loadDataFromStorage()
  const index = contactMessages.findIndex(message => message.id === id)
  if (index !== -1) {
    contactMessages.splice(index, 1)
    saveDataToStorage()
    return true
  }
  return false
}

export const getMessagesByStatus = (status) => {
  loadDataFromStorage()
  return contactMessages.filter(message => message.status === status)
}

export const getMessageStats = () => {
  loadDataFromStorage()
  const total = contactMessages.length
  const pending = contactMessages.filter(m => m.status === "pending").length
  const responded = contactMessages.filter(m => m.status === "responded").length
  const closed = contactMessages.filter(m => m.status === "closed").length
  
  return { total, pending, responded, closed }
}

// Utility functions
export const getCoursesByCategory = (category) => {
  return getCourses().filter(course => course.category === category)
}

export const getCourseCategories = () => {
  loadDataFromStorage()
  return [...new Set(courses.map(course => course.category))]
}

// Debug function to check localStorage data
export const debugLocalStorage = () => {
  if (typeof window !== 'undefined') {
    console.log('=== localStorage Debug Info ===')
    console.log('Categories in localStorage:', localStorage.getItem('usl_categories'))
    console.log('Courses in localStorage:', localStorage.getItem('usl_courses'))
    console.log('Instructors in localStorage:', localStorage.getItem('usl_instructors'))
    console.log('Current categories array:', categories)
    console.log('Current courses array length:', courses.length)
    console.log('================================')
  }
}

// Utility function to reset data to static defaults
export const resetDataToDefaults = () => {
  courses = [...staticCourses]
  instructors = [...staticInstructors]
  categories = [...staticCategories]
  contactMessages = [...staticContactMessages]
  saveDataToStorage()
}

// Utility function to clear all data
export const clearAllData = () => {
  courses = []
  instructors = []
  categories = []
  contactMessages = []
  saveDataToStorage()
}
