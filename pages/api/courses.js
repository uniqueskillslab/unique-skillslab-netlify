// API endpoint for courses data - server-side storage
import { courses as staticCourses } from '../../lib/data/courses.js'
import { 
  loadCourses, 
  addCourse, 
  updateCourse, 
  deleteCourse 
} from '../../lib/serverStorage.js'

export default function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method === 'GET') {
    // Return all courses (static + admin-added)
    const adminCourses = loadCourses()
    const allCourses = [...staticCourses, ...adminCourses]
    res.status(200).json({
      success: true,
      courses: allCourses,
      count: allCourses.length
    })
  } else if (req.method === 'POST') {
    // Add a new course
    try {
      const courseData = req.body
      const newCourse = addCourse(courseData)
      
      console.log('Server: Course added:', newCourse)
      
      res.status(201).json({
        success: true,
        course: newCourse,
        message: 'Course added successfully'
      })
    } catch (error) {
      console.error('Server: Error adding course:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to add course'
      })
    }
  } else if (req.method === 'PUT') {
    // Update a course
    try {
      const { id } = req.query
      const courseData = req.body
      const updatedCourse = updateCourse(id, courseData)
      
      if (updatedCourse) {
        console.log('Server: Course updated:', updatedCourse)
        res.status(200).json({
          success: true,
          course: updatedCourse,
          message: 'Course updated successfully'
        })
      } else {
        res.status(404).json({
          success: false,
          error: 'Course not found'
        })
      }
    } catch (error) {
      console.error('Server: Error updating course:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to update course'
      })
    }
  } else if (req.method === 'DELETE') {
    // Delete a course
    try {
      const { id } = req.query
      const deletedCourse = deleteCourse(id)
      
      if (deletedCourse) {
        console.log('Server: Course deleted:', deletedCourse)
        res.status(200).json({
          success: true,
          message: 'Course deleted successfully'
        })
      } else {
        res.status(404).json({
          success: false,
          error: 'Course not found'
        })
      }
    } catch (error) {
      console.error('Server: Error deleting course:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to delete course'
      })
    }
  } else {
    res.status(405).json({
      success: false,
      error: 'Method not allowed'
    })
  }
}
