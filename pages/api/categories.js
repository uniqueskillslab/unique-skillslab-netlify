// API endpoint for categories data - server-side storage
import { categories as staticCategories } from '../../lib/data/categories.js'
import { 
  loadCategories, 
  addCategory, 
  updateCategory, 
  deleteCategory 
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
    // Return all categories (static + admin-added)
    const adminCategories = loadCategories()
    const allCategories = [...staticCategories, ...adminCategories]
    res.status(200).json({
      success: true,
      categories: allCategories,
      count: allCategories.length
    })
  } else if (req.method === 'POST') {
    // Add a new category
    try {
      const categoryData = req.body
      const newCategory = addCategory(categoryData)
      
      console.log('Server: Category added:', newCategory)
      
      res.status(201).json({
        success: true,
        category: newCategory,
        message: 'Category added successfully'
      })
    } catch (error) {
      console.error('Server: Error adding category:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to add category'
      })
    }
  } else if (req.method === 'PUT') {
    // Update a category
    try {
      const { id } = req.query
      const categoryData = req.body
      const updatedCategory = updateCategory(id, categoryData)
      
      if (updatedCategory) {
        console.log('Server: Category updated:', updatedCategory)
        res.status(200).json({
          success: true,
          category: updatedCategory,
          message: 'Category updated successfully'
        })
      } else {
        res.status(404).json({
          success: false,
          error: 'Category not found'
        })
      }
    } catch (error) {
      console.error('Server: Error updating category:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to update category'
      })
    }
  } else if (req.method === 'DELETE') {
    // Delete a category
    try {
      const { id } = req.query
      const deletedCategory = deleteCategory(id)
      
      if (deletedCategory) {
        console.log('Server: Category deleted:', deletedCategory)
        res.status(200).json({
          success: true,
          message: 'Category deleted successfully'
        })
      } else {
        res.status(404).json({
          success: false,
          error: 'Category not found'
        })
      }
    } catch (error) {
      console.error('Server: Error deleting category:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to delete category'
      })
    }
  } else {
    res.status(405).json({
      success: false,
      error: 'Method not allowed'
    })
  }
}
