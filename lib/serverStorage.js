// Persistent server storage for admin data
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const COURSES_FILE = path.join(DATA_DIR, 'admin-courses.json')
const CATEGORIES_FILE = path.join(DATA_DIR, 'admin-categories.json')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Load data from files
export const loadCourses = () => {
  try {
    if (fs.existsSync(COURSES_FILE)) {
      const data = fs.readFileSync(COURSES_FILE, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading courses:', error)
  }
  return []
}

export const loadCategories = () => {
  try {
    if (fs.existsSync(CATEGORIES_FILE)) {
      const data = fs.readFileSync(CATEGORIES_FILE, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading categories:', error)
  }
  return []
}

// Save data to files
export const saveCourses = (courses) => {
  try {
    fs.writeFileSync(COURSES_FILE, JSON.stringify(courses, null, 2))
    return true
  } catch (error) {
    console.error('Error saving courses:', error)
    return false
  }
}

export const saveCategories = (categories) => {
  try {
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2))
    return true
  } catch (error) {
    console.error('Error saving categories:', error)
    return false
  }
}

// Course operations
export const addCourse = (courseData) => {
  const courses = loadCourses()
  
  // Static course IDs (hardcoded to avoid import issues)
  const staticIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  
  // Ensure the ID doesn't conflict with static courses
  let newId = courseData.id
  if (!newId || staticIds.includes(newId)) {
    const maxId = Math.max(...courses.map(c => c.id), ...staticIds, 0)
    newId = maxId + 1
  }
  
  const newCourse = {
    ...courseData,
    id: newId,
    isAdminAdded: true,
    addedAt: new Date().toISOString()
  }
  
  console.log('ServerStorage: Adding course with ID:', newId, 'to prevent conflicts with static courses')
  courses.push(newCourse)
  saveCourses(courses)
  return newCourse
}

export const updateCourse = (id, courseData) => {
  const courses = loadCourses()
  console.log('ServerStorage: updateCourse called with ID:', id, 'courses count:', courses.length)
  const index = courses.findIndex(course => course.id === parseInt(id))
  console.log('ServerStorage: found course at index:', index)
  if (index !== -1) {
    courses[index] = { ...courses[index], ...courseData }
    saveCourses(courses)
    console.log('ServerStorage: course updated successfully')
    return courses[index]
  }
  console.log('ServerStorage: course not found for update')
  return null
}

export const deleteCourse = (id) => {
  const courses = loadCourses()
  console.log('ServerStorage: deleteCourse called with ID:', id, 'courses count:', courses.length)
  const index = courses.findIndex(course => course.id === parseInt(id))
  console.log('ServerStorage: found course at index:', index)
  if (index !== -1) {
    const deletedCourse = courses.splice(index, 1)[0]
    saveCourses(courses)
    console.log('ServerStorage: course deleted successfully:', deletedCourse.title)
    return deletedCourse
  }
  console.log('ServerStorage: course not found for deletion')
  return null
}

// Category operations
export const addCategory = (categoryData) => {
  const categories = loadCategories()
  const newCategory = {
    ...categoryData,
    // Use the ID from client if provided, otherwise generate one
    id: categoryData.id || Math.max(...categories.map(c => c.id), 0) + 1,
    isAdminAdded: true,
    addedAt: new Date().toISOString()
  }
  categories.push(newCategory)
  saveCategories(categories)
  return newCategory
}

export const updateCategory = (id, categoryData) => {
  const categories = loadCategories()
  const index = categories.findIndex(cat => cat.id === parseInt(id))
  if (index !== -1) {
    categories[index] = { ...categories[index], ...categoryData }
    saveCategories(categories)
    return categories[index]
  }
  return null
}

export const deleteCategory = (id) => {
  const categories = loadCategories()
  const index = categories.findIndex(cat => cat.id === parseInt(id))
  if (index !== -1) {
    const deletedCategory = categories.splice(index, 1)[0]
    saveCategories(categories)
    return deletedCategory
  }
  return null
}
