// Netlify Function for categories data - server-side storage
import { categories as staticCategories } from '../../lib/data/categories.js'
import { 
  loadCategories, 
  addCategory, 
  updateCategory, 
  deleteCategory 
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
    // Return all categories (static + admin-added)
    const adminCategories = loadCategories()
    const allCategories = [...staticCategories, ...adminCategories]
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        categories: allCategories,
        count: allCategories.length
      }),
    };
  } else if (event.httpMethod === 'POST') {
    // Add a new category
    try {
      const categoryData = JSON.parse(event.body || '{}')
      const newCategory = addCategory(categoryData)
      
      console.log('Server: Category added:', newCategory)
      
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          category: newCategory,
          message: 'Category added successfully'
        }),
      };
    } catch (error) {
      console.error('Server: Error adding category:', error)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Failed to add category'
        }),
      };
    }
  } else if (event.httpMethod === 'PUT') {
    // Update a category
    try {
      const { id } = event.queryStringParameters || {}
      const categoryData = JSON.parse(event.body || '{}')
      const updatedCategory = updateCategory(id, categoryData)
      
      if (updatedCategory) {
        console.log('Server: Category updated:', updatedCategory)
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            category: updatedCategory,
            message: 'Category updated successfully'
          }),
        };
      } else {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Category not found'
          }),
        };
      }
    } catch (error) {
      console.error('Server: Error updating category:', error)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Failed to update category'
        }),
      };
    }
  } else if (event.httpMethod === 'DELETE') {
    // Delete a category
    try {
      const { id } = event.queryStringParameters || {}
      const deletedCategory = deleteCategory(id)
      
      if (deletedCategory) {
        console.log('Server: Category deleted:', deletedCategory)
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Category deleted successfully'
          }),
        };
      } else {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Category not found'
          }),
        };
      }
    } catch (error) {
      console.error('Server: Error deleting category:', error)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Failed to delete category'
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
