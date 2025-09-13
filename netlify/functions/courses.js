// Netlify Function for courses data - server-side storage
import { courses as staticCourses } from '../../lib/data/courses.js'
import { 
  loadCourses, 
  addCourse, 
  updateCourse, 
  deleteCourse 
} from '../../lib/serverStorage.js'

export const handler = async (event, context) => {
  // Enable CORS for all origins
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod === 'GET') {
    // Return all courses (static + admin-added)
    const adminCourses = loadCourses()
    const allCourses = [...staticCourses, ...adminCourses]
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        courses: allCourses,
        count: allCourses.length
      }),
    };
  } else if (event.httpMethod === 'POST') {
    // Add a new course
    try {
      const courseData = JSON.parse(event.body || '{}')
      const newCourse = addCourse(courseData)
      
      console.log('Server: Course added:', newCourse)
      
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          course: newCourse,
          message: 'Course added successfully'
        }),
      };
    } catch (error) {
      console.error('Server: Error adding course:', error)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Failed to add course'
        }),
      };
    }
  } else if (event.httpMethod === 'PUT') {
    // Update a course
    try {
      const { id } = event.queryStringParameters || {}
      const courseData = JSON.parse(event.body || '{}')
      const updatedCourse = updateCourse(id, courseData)
      
      if (updatedCourse) {
        console.log('Server: Course updated:', updatedCourse)
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            course: updatedCourse,
            message: 'Course updated successfully'
          }),
        };
      } else {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Course not found'
          }),
        };
      }
    } catch (error) {
      console.error('Server: Error updating course:', error)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Failed to update course'
        }),
      };
    }
  } else if (event.httpMethod === 'DELETE') {
    // Delete a course
    try {
      const { id } = event.queryStringParameters || {}
      const deletedCourse = deleteCourse(id)
      
      if (deletedCourse) {
        console.log('Server: Course deleted:', deletedCourse)
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Course deleted successfully'
          }),
        };
      } else {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Course not found'
          }),
        };
      }
    } catch (error) {
      console.error('Server: Error deleting course:', error)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Failed to delete course'
        }),
      };
    }
  } else {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Method not allowed'
      }),
    };
  }
};
