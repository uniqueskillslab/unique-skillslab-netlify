import { useState, useEffect } from 'react'

const CategoryForm = ({ 
  data = {}, 
  onSubmit, 
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      // Editing existing category
      setFormData({
        name: data.name || ''
      })
    } else {
      // Adding new category
      setFormData({
        name: ''
      })
    }
  }, [data])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Category name is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {data && data.id ? 'Edit Category' : 'Add New Category'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter category name (e.g., Web Development)"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>


        
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            {data && data.id ? 'Update' : 'Add'} Category
          </button>
        </div>
      </form>
    </div>
  )
}

export default CategoryForm
