// Data Manager - handles both static data and localStorage data
import { courses as staticCourses } from './data/courses.js'
import { instructors as staticInstructors } from './data/instructors.js'
import { categories as staticCategories } from './data/categories.js'
import { contactMessages as staticContactMessages } from './data/contactMessages.js'

// Initialize data arrays
let courses = [...staticCourses]
let instructors = [...staticInstructors]
let categories = [...staticCategories]
let contactMessages = [...staticContactMessages]

// Load data from localStorage and server (for admin changes)
const loadDataFromStorage = () => {
  try {
    if (typeof window !== 'undefined') {
      // Load admin courses from localStorage
      const storedAdminCourses = localStorage.getItem('usl_admin_courses')
      const storedAdminCategories = localStorage.getItem('usl_admin_categories')
      
      let adminCourses = []
      let adminCategories = []
      
      if (storedAdminCourses) {
        adminCourses = JSON.parse(storedAdminCourses)
      }
      
      if (storedAdminCategories) {
        adminCategories = JSON.parse(storedAdminCategories)
      }
      
      // Also try to load from server API (for cross-browser access)
      // This is done asynchronously to not block the UI
      fetch('/api/courses')
        .then(response => response.json())
        .then(data => {
          if (data.success && data.courses) {
            const serverAdminCourses = data.courses.filter(course => course.isAdminAdded)
            const staticIds = staticCourses.map(c => c.id)
            
            // Filter out any courses with conflicting IDs
            const filteredServerCourses = serverAdminCourses.filter(course => 
              !staticIds.includes(course.id)
            )
            
            console.log('DataManager: Server courses loaded:', filteredServerCourses.length, 'admin courses (filtered from', serverAdminCourses.length, ')')
            if (filteredServerCourses.length > 0) {
              // Update localStorage with server data
              localStorage.setItem('usl_admin_courses', JSON.stringify(filteredServerCourses))
              // Update the courses array
              courses.splice(staticCourses.length) // Remove existing admin courses
              courses.push(...filteredServerCourses) // Add server admin courses
              console.log('DataManager: Updated courses array with server data, total courses:', courses.length)
            }
          }
        })
        .catch(error => console.log('Server courses not available:', error))
      
      fetch('/api/categories')
        .then(response => response.json())
        .then(data => {
          if (data.success && data.categories) {
            const serverAdminCategories = data.categories.filter(cat => cat.isAdminAdded)
            console.log('DataManager: Server categories loaded:', serverAdminCategories.length, 'admin categories')
            if (serverAdminCategories.length > 0) {
              // Update localStorage with server data
              localStorage.setItem('usl_admin_categories', JSON.stringify(serverAdminCategories))
              // Update the categories array
              categories.splice(staticCategories.length) // Remove existing admin categories
              categories.push(...serverAdminCategories) // Add server admin categories
              console.log('DataManager: Updated categories array with server data, total categories:', categories.length)
            }
          }
        })
        .catch(error => console.log('Server categories not available:', error))
      
      // Combine static data with admin data
      courses = [...staticCourses, ...adminCourses]
      categories = [...staticCategories, ...adminCategories]
      instructors = [...staticInstructors]
      contactMessages = [...staticContactMessages]
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

// Function to clean up duplicate data and remove test courses
const cleanupDuplicateData = () => {
  try {
    if (typeof window !== 'undefined') {
      // Clean up any duplicate courses in localStorage
      const adminCourses = JSON.parse(localStorage.getItem('usl_admin_courses') || '[]')
      
      // Remove any test courses and courses with conflicting IDs
      const staticIds = staticCourses.map(c => c.id)
      const filteredCourses = adminCourses.filter(course => 
        !course.title.toLowerCase().includes('test course') &&
        !course.description.toLowerCase().includes('test course') &&
        !staticIds.includes(course.id) // Remove courses with IDs that conflict with static courses
      )
      
      // Remove duplicates
      const uniqueCourses = filteredCourses.filter((course, index, self) => 
        index === self.findIndex(c => c.id === course.id)
      )
      
      if (filteredCourses.length !== adminCourses.length) {
        console.log('Removed test courses from localStorage')
      }
      if (uniqueCourses.length !== filteredCourses.length) {
        console.log('Cleaned up duplicate courses in localStorage')
      }
      
      localStorage.setItem('usl_admin_courses', JSON.stringify(uniqueCourses))
      
      // Clean up any duplicate categories in localStorage
      const adminCategories = JSON.parse(localStorage.getItem('usl_admin_categories') || '[]')
      
      // Remove categories with conflicting IDs
      const staticCategoryIds = staticCategories.map(c => c.id)
      const filteredCategories = adminCategories.filter(category => 
        !staticCategoryIds.includes(category.id) // Remove categories with IDs that conflict with static categories
      )
      
      const uniqueCategories = filteredCategories.filter((category, index, self) => 
        index === self.findIndex(c => c.id === category.id)
      )
      if (uniqueCategories.length !== adminCategories.length) {
        console.log('Cleaned up duplicate categories in localStorage')
        localStorage.setItem('usl_admin_categories', JSON.stringify(uniqueCategories))
      }
    }
  } catch (error) {
    console.error('Error cleaning up duplicate data:', error)
  }
}

// Initialize data
cleanupDuplicateData()
loadDataFromStorage()

// Function to refresh data from server (for cross-browser updates)
export const refreshDataFromServer = () => {
  console.log('Refreshing data from server...')
  loadDataFromStorage()
}

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
  console.log('DataManager: addCourse called with data:', courseData)
  
  // Create new course with unique ID (ensure it's higher than static courses)
  const staticMaxId = Math.max(...staticCourses.map(c => c.id), 0)
  const existingAdminCourses = courses.filter(c => c.isAdminAdded)
  const adminMaxId = existingAdminCourses.length > 0 ? Math.max(...existingAdminCourses.map(c => c.id), 0) : 0
  const newId = Math.max(staticMaxId + 1, adminMaxId + 1)
  
  console.log('DataManager: ID generation - Static max ID:', staticMaxId, 'Admin max ID:', adminMaxId, 'New ID:', newId)
  
  const newCourse = {
    ...courseData,
    id: newId,
    instructorId: courseData.instructorId && courseData.instructorId !== '' ? parseInt(courseData.instructorId) : null,
    learningOutcomes: courseData.learningOutcomes || [],
    courseStructure: courseData.courseStructure || [],
    pdfLink: courseData.pdfLink || '',
    isAdminAdded: true,
    addedAt: new Date().toISOString()
  }
  
  // Add to courses array
  courses.push(newCourse)
  
  // Save to localStorage
  const allAdminCourses = courses.filter(course => course.isAdminAdded)
  localStorage.setItem('usl_admin_courses', JSON.stringify(allAdminCourses))
  
  // Also save to server via API
  if (typeof window !== 'undefined') {
    fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCourse)
    }).then(response => response.json())
     .then(data => console.log('DataManager: Server add response:', data))
     .catch(error => console.error('Failed to save to server:', error))
  }
  
  console.log('DataManager: Course added successfully:', newCourse)
  return newCourse
}

export const updateCourse = (id, courseData) => {
  console.log('DataManager: updateCourse called with ID:', id, 'type:', typeof id, 'data:', courseData)
  
  loadDataFromStorage()
  const index = courses.findIndex(course => course.id === parseInt(id))
  console.log('DataManager: found course at index:', index)
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
    
    // Save to localStorage
    const adminCourses = courses.filter(course => course.isAdminAdded)
    localStorage.setItem('usl_admin_courses', JSON.stringify(adminCourses))
    
    // Also update on server via API
    if (typeof window !== 'undefined') {
      fetch(`/api/courses?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData)
      }).then(response => response.json())
       .then(data => console.log('DataManager: Server update response:', data))
       .catch(error => console.error('Failed to update on server:', error))
    }
    
    console.log('DataManager: Course updated successfully:', courses[index])
    return courses[index]
  }
  
  console.log('DataManager: Failed to update course - not found')
  return null
}

export const deleteCourse = (id) => {
  console.log('DataManager: deleteCourse called with ID:', id, 'type:', typeof id)
  console.log('DataManager: Current courses array length:', courses.length)
  console.log('DataManager: Current courses IDs:', courses.map(c => c.id))
  
  // First try to find by exact ID match
  let index = courses.findIndex(course => course.id === parseInt(id))
  console.log('DataManager: found course at index:', index)
  
  // If not found, try to find by title (for stuck test courses)
  if (index === -1) {
    const testCourseIndex = courses.findIndex(course => 
      course.title.toLowerCase().includes('test course') ||
      course.description.toLowerCase().includes('test course')
    )
    if (testCourseIndex !== -1) {
      index = testCourseIndex
      console.log('DataManager: found test course at index:', index)
    }
  }
  
  // If still not found, try to reload data and search again
  if (index === -1) {
    console.log('DataManager: Course not found, reloading data and trying again...')
    loadDataFromStorage()
    index = courses.findIndex(course => course.id === parseInt(id))
    console.log('DataManager: After reload, found course at index:', index)
  }
  
  if (index !== -1) {
    const deletedCourse = courses.splice(index, 1)[0]
    console.log('DataManager: deleted course:', deletedCourse.title)
    
    // Save to localStorage
    const adminCourses = courses.filter(course => course.isAdminAdded)
    localStorage.setItem('usl_admin_courses', JSON.stringify(adminCourses))
    
    // Also delete from server via API (only for admin-added courses)
    if (typeof window !== 'undefined' && deletedCourse.isAdminAdded) {
      fetch(`/api/courses?id=${id}`, {
        method: 'DELETE'
      }).then(response => {
        if (response.ok) {
          return response.json()
        } else {
          console.log('Course not found on server (may be static course)')
          return null
        }
      })
       .then(data => {
         if (data) {
           console.log('DataManager: Server delete response:', data)
         }
       })
       .catch(error => console.error('Failed to delete from server:', error))
    }
    
    console.log('DataManager: Course deleted successfully')
    return true
  }
  
  console.log('DataManager: Failed to delete course - not found')
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
  // Add to shared data so all users can see it
  const newInstructor = addSharedInstructor(instructorData)
  loadDataFromStorage() // Reload to include the new instructor
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
  console.log('DataManager: addCategory called with data:', categoryData)
  
  // Create new category with unique ID (ensure it's higher than static categories)
  const staticMaxId = Math.max(...staticCategories.map(c => c.id), 0)
  const existingAdminCategories = categories.filter(c => c.isAdminAdded)
  const adminMaxId = existingAdminCategories.length > 0 ? Math.max(...existingAdminCategories.map(c => c.id), 0) : 0
  const newId = Math.max(staticMaxId + 1, adminMaxId + 1)
  
  const newCategory = {
    ...categoryData,
    id: newId,
    isAdminAdded: true,
    addedAt: new Date().toISOString()
  }
  
  // Add to categories array
  categories.push(newCategory)
  
  // Save to localStorage
  const allAdminCategories = categories.filter(cat => cat.isAdminAdded)
  localStorage.setItem('usl_admin_categories', JSON.stringify(allAdminCategories))
  
  console.log('DataManager: Category added successfully:', newCategory)
  return newCategory
}

export const updateCategory = (id, categoryData) => {
  console.log('DataManager: updateCategory called with ID:', id, 'data:', categoryData)
  
  loadDataFromStorage()
  const index = categories.findIndex(cat => cat.id === parseInt(id))
  if (index !== -1) {
    categories[index] = { ...categories[index], ...categoryData }
    
    // Save to localStorage
    const adminCategories = categories.filter(cat => cat.isAdminAdded)
    localStorage.setItem('usl_admin_categories', JSON.stringify(adminCategories))
    
    // Also update on server via API
    if (typeof window !== 'undefined') {
      fetch(`/api/categories?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData)
      }).catch(error => console.error('Failed to update category on server:', error))
    }
    
    console.log('DataManager: Category updated successfully:', categories[index])
    return categories[index]
  }
  
  console.log('DataManager: Failed to update category')
  return null
}

export const deleteCategory = (id) => {
  console.log('DataManager: deleteCategory called with ID:', id)
  
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
    
    // Save to localStorage
    const adminCategories = categories.filter(cat => cat.isAdminAdded)
    localStorage.setItem('usl_admin_categories', JSON.stringify(adminCategories))
    
    // Also delete from server via API (only for admin-added categories)
    if (typeof window !== 'undefined' && deletedCategory.isAdminAdded) {
      fetch(`/api/categories?id=${id}`, {
        method: 'DELETE'
      }).then(response => {
        if (response.ok) {
          return response.json()
        } else {
          console.log('Category not found on server (may be static category)')
          return null
        }
      })
       .then(data => {
         if (data) {
           console.log('DataManager: Server delete response:', data)
         }
       })
       .catch(error => console.error('Failed to delete category from server:', error))
    }
    
    console.log('DataManager: Category deleted successfully:', deletedCategory)
    return deletedCategory
  }
  
  console.log('DataManager: Failed to delete category')
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
    
    // Also debug file data
    debugFileData()
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
