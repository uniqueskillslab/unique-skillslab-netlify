import { useState, useEffect } from 'react'

const AdminForm = ({ 
  type, 
  data = {}, 
  onSubmit, 
  onCancel, 
  instructors = [], 
  courses = [] 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    price: '',
    instructorId: '',
    image: '',
    name: '',
    biography: '',
    photoUrl: '',
    specialization: '',
    courses: []
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      // Editing existing item
      setFormData({
        title: data.title || '',
        description: data.description || '',
        category: data.category || '',
        duration: data.duration || '',
        price: data.price || '',
        instructorId: data.instructorId || '',
        image: data.image || '',
        name: data.name || '',
        biography: data.biography || '',
        photoUrl: data.photoUrl || '',
        specialization: data.specialization || '',
        courses: data.courses || []
      })
    } else {
      // Adding new item - set default values
      setFormData({
        title: '',
        description: '',
        category: '',
        duration: '',
        price: '',
        instructorId: '',
        image: type === 'course' ? '/assets/course-placeholder.jpg' : '',
        name: '',
        biography: '',
        photoUrl: type === 'instructor' ? '/assets/instructor-placeholder.jpg' : '',
        specialization: '',
        courses: []
      })
    }
  }, [data, type])

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

  const handleMultiSelectChange = (e) => {
    const { name } = e.target
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value))
    setFormData(prev => ({
      ...prev,
      [name]: selectedOptions
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (type === 'course') {
      if (!formData.title.trim()) newErrors.title = 'Title is required'
      if (!formData.description.trim()) newErrors.description = 'Description is required'
      if (!formData.category.trim()) newErrors.category = 'Category is required'
      if (!formData.duration.trim()) newErrors.duration = 'Duration is required'
      if (!formData.price.trim()) newErrors.price = 'Price is required'
      if (!formData.instructorId) newErrors.instructorId = 'Instructor is required'
    } else if (type === 'instructor') {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.biography.trim()) newErrors.biography = 'Biography is required'
      if (!formData.specialization.trim()) newErrors.specialization = 'Specialization is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const courseFields = (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter course title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select category</option>
            <option value="Media">Media</option>
            <option value="IT">IT</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows="4"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter course description"
        ></textarea>
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration *
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.duration ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., 3 months"
          />
          {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price *
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., 25,000 PKR"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instructor *
          </label>
          <select
            name="instructorId"
            value={formData.instructorId}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.instructorId ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select instructor</option>
            {instructors.map(instructor => (
              <option key={instructor.id} value={instructor.id}>
                {instructor.name}
              </option>
            ))}
          </select>
          {errors.instructorId && <p className="text-red-500 text-sm mt-1">{errors.instructorId}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image Path
        </label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="e.g., /assets/course-image.jpg"
        />
        <p className="text-sm text-gray-500 mt-1">Enter the path to the image file (e.g., /assets/course-image.jpg)</p>
      </div>
    </>
  )

  const instructorFields = (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter instructor name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specialization *
          </label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.specialization ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Digital Marketing"
          />
          {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Biography *
        </label>
        <textarea
          name="biography"
          value={formData.biography}
          onChange={handleInputChange}
          rows="4"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.biography ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter instructor biography"
        ></textarea>
        {errors.biography && <p className="text-red-500 text-sm mt-1">{errors.biography}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photo Path
          </label>
          <input
            type="text"
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="e.g., /assets/instructor-photo.jpg"
          />
          <p className="text-sm text-gray-500 mt-1">Enter the path to the photo file (e.g., /assets/instructor-photo.jpg)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Associated Courses
          </label>
          <select
            name="courses"
            value={formData.courses}
            onChange={handleMultiSelectChange}
            multiple
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple courses</p>
        </div>
      </div>
    </>
  )

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {data && data.id ? `Edit ${type === 'course' ? 'Course' : 'Instructor'}` : `Add New ${type === 'course' ? 'Course' : 'Instructor'}`}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {type === 'course' ? courseFields : instructorFields}
        
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
            {data && data.id ? 'Update' : 'Add'} {type === 'course' ? 'Course' : 'Instructor'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminForm
