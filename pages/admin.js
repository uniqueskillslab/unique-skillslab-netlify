import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import AdminForm from '../components/AdminForm'
import ContactMessageForm from '../components/ContactMessageForm'
import ImageWithFallback from '../components/ImageWithFallback'
import { 
  getCourses, 
  getInstructors, 
  getCategories,
  addCourse, 
  updateCourse, 
  deleteCourse, 
  addInstructor, 
  updateInstructor, 
  deleteInstructor,
  addCategory,
  updateCategory,
  deleteCategory,
  getContactMessages,
  updateContactMessage,
  deleteContactMessage,
  getMessageStats
} from '../lib/data'


export default function Admin({ isAuthenticated, setIsAuthenticated }) {
  const router = useRouter()
  const [courses, setCourses] = useState([])
  const [instructors, setInstructors] = useState([])
  const [categories, setCategories] = useState([])
  const [contactMessages, setContactMessages] = useState([])
  const [messageStats, setMessageStats] = useState({ total: 0, pending: 0, responded: 0, closed: 0 })
  const [activeTab, setActiveTab] = useState('courses')
  const [showForm, setShowForm] = useState(false)
  const [formType, setFormType] = useState('course')
  const [editingItem, setEditingItem] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    loadData()
  }, [isAuthenticated, router])

  const loadData = () => {
    setCourses(getCourses())
    setInstructors(getInstructors())
    setCategories(getCategories())
    setContactMessages(getContactMessages())
    setMessageStats(getMessageStats())
  }

  const handleAdd = (type) => {
    setFormType(type)
    setEditingItem(null)
    setShowForm(true)
  }

  const handleEdit = (item, type) => {
    setFormType(type)
    setEditingItem(item)
    setShowForm(true)
  }

  const handleDelete = async (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      setLoading(true)
      
      try {
        console.log(`Deleting ${type} with ID:`, id)
        if (type === 'course') {
          const result = deleteCourse(id)
          console.log('Delete course result:', result)
        } else if (type === 'instructor') {
          deleteInstructor(id)
        } else if (type === 'message') {
          deleteContactMessage(id)
        }
        
        loadData()
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`)
      } catch (error) {
        console.error(`Error deleting ${type}:`, error)
        alert(`Error deleting ${type}: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleFormSubmit = async (formData) => {
    setLoading(true)
    
    try {
      let result
      if (formType === 'course') {
        if (editingItem) {
          result = updateCourse(editingItem.id, formData)
        } else {
          result = addCourse(formData)
        }
      } else if (formType === 'instructor') {
        if (editingItem) {
          result = updateInstructor(editingItem.id, formData)
        } else {
          result = addInstructor(formData)
        }
      } else if (formType === 'category') {
        if (editingItem) {
          result = updateCategory(editingItem.id, formData)
        } else {
          result = addCategory(formData)
        }
      } else if (formType === 'message') {
        result = updateContactMessage(editingItem.id, formData)
      }
      
      if (result) {
        loadData()
        setShowForm(false)
        setEditingItem(null)
        alert(`${formType.charAt(0).toUpperCase() + formType.slice(1)} ${editingItem ? 'updated' : 'added'} successfully!`)
      } else {
        alert(`Failed to ${editingItem ? 'update' : 'add'} ${formType}. Please try again.`)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert(`Error ${editingItem ? 'updating' : 'adding'} ${formType}: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingItem(null)
  }

  const handleAddCategory = (categoryData) => {
    const newCategory = addCategory(categoryData)
    if (newCategory) {
      loadData()
      alert('Category added successfully!')
    }
  }

  const handleDeleteCategory = (categoryId) => {
    const deletedCategory = deleteCategory(categoryId)
    if (deletedCategory) {
      loadData()
      alert('Category deleted successfully!')
    }
  }



  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <Head>
        <title>Admin Panel - Unique Skills Lab</title>
        <meta name="description" content="Admin panel for managing courses and instructors" />
      </Head>

      <div className="pt-16">
                 {/* Header */}
         <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white py-8">
           <div className="container-custom">
             <div className="flex items-center justify-between">
               <div>
                 <h1 className="text-3xl font-bold">Admin Panel</h1>
                 <p className="text-primary-100">Manage courses, instructors, and contact messages</p>
               </div>
               <div className="flex items-center space-x-4">
                 {/* Message Stats */}
                 <div className="bg-white/20 rounded-lg p-3 text-center">
                   <div className="text-2xl font-bold">{messageStats.pending}</div>
                   <div className="text-sm text-primary-100">Pending Messages</div>
                 </div>
                 

                 <button
                   onClick={() => {
                     if (confirm('This will clear ALL admin-added courses and categories. Are you sure?')) {
                       localStorage.removeItem('usl_admin_courses')
                       localStorage.removeItem('usl_admin_categories')
                       window.location.reload()
                     }
                   }}
                   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 mr-2"
                 >
                   Clear Admin Data
                 </button>
                 

                 
                 <button
                   onClick={() => {
                     localStorage.removeItem('authToken')
                     setIsAuthenticated(false)
                     router.push('/')
                   }}
                   className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                 >
                   Logout
                 </button>
               </div>
             </div>
           </div>
         </div>

        <div className="container-custom py-8">
                     {/* Tabs */}
           <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
             <button
               onClick={() => setActiveTab('courses')}
               className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
                 activeTab === 'courses'
                   ? 'bg-white text-primary-600 shadow-sm'
                   : 'text-gray-600 hover:text-gray-900'
               }`}
             >
               Courses ({courses.length})
             </button>
             <button
               onClick={() => setActiveTab('instructors')}
               className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
                 activeTab === 'instructors'
                   ? 'bg-white text-primary-600 shadow-sm'
                   : 'text-gray-600 hover:text-gray-900'
               }`}
             >
               Instructors ({instructors.length})
             </button>

             <button
               onClick={() => setActiveTab('messages')}
               className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
                 activeTab === 'messages'
                   ? 'bg-white text-primary-600 shadow-sm'
                   : 'text-gray-600 hover:text-gray-900'
               }`}
             >
               Messages ({messageStats.pending > 0 && `${messageStats.pending} pending`})
             </button>
           </div>

                     {/* Content */}
           {showForm ? (
             <>
               {formType === 'message' ? (
                 <ContactMessageForm
                   message={editingItem}
                   onSubmit={handleFormSubmit}
                   onCancel={handleFormCancel}
                 />
               ) : (
                 <AdminForm
                   type={formType}
                   data={editingItem}
                   onSubmit={handleFormSubmit}
                   onCancel={handleFormCancel}
                   instructors={instructors}
                   courses={courses}
                   categories={categories}
                   onAddCategory={handleAddCategory}
                   onDeleteCategory={handleDeleteCategory}
                 />
               )}
             </>
           ) : (
            <div className="space-y-6">
              {/* Add Button */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeTab === 'courses' ? 'Courses' : 
                   activeTab === 'instructors' ? 'Instructors' : 
                   'Contact Messages'}
                </h2>
                {activeTab !== 'messages' && (
                  <button
                    onClick={() => handleAdd(activeTab.slice(0, -1))}
                    className="btn-primary"
                    disabled={loading}
                  >
                    Add {activeTab === 'courses' ? 'Course' : 'Instructor'}
                  </button>
                )}
              </div>

              {/* Data Table */}
              {activeTab === 'courses' && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Course
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Duration
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Instructor
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Content
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {courses.map((course) => (
                          <tr key={course.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {course.title}
                                </div>
                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                  {course.description}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                                {course.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {course.duration}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {course.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {course.instructor?.name || 'N/A'}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              <div className="space-y-1">
                                <div className="text-xs">
                                  <span className="font-medium">Learning Outcomes:</span> {course.learningOutcomes ? course.learningOutcomes.length : 0} items
                                </div>
                                <div className="text-xs">
                                  <span className="font-medium">Modules:</span> {course.courseStructure ? course.courseStructure.length : 0} modules
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleEdit(course, 'course')}
                                className="text-primary-600 hover:text-primary-900 mr-4"
                                disabled={loading}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(course.id, 'course')}
                                className="text-red-600 hover:text-red-900"
                                disabled={loading}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'instructors' && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Instructor
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Specialization
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Biography
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Courses
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {instructors.map((instructor) => (
                          <tr key={instructor.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <ImageWithFallback
                                    className="h-10 w-10 rounded-full object-cover aspect-square"
                                    src={instructor.photoUrl}
                                    alt={instructor.name}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {instructor.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {instructor.specialization}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 truncate max-w-xs">
                                {instructor.biography}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {instructor.courses?.length || 0} courses
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleEdit(instructor, 'instructor')}
                                className="text-primary-600 hover:text-primary-900 mr-4"
                                disabled={loading}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(instructor.id, 'instructor')}
                                className="text-red-600 hover:text-red-900"
                                disabled={loading}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}



              {activeTab === 'messages' && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact Info
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Message
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {contactMessages.map((message) => (
                          <tr key={message.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {message.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {message.email}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {message.phone}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 truncate max-w-xs">
                                {message.message}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                message.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                message.status === 'responded' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(message.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleEdit(message, 'message')}
                                className="text-primary-600 hover:text-primary-900 mr-4"
                                disabled={loading}
                              >
                                Manage
                              </button>
                              <button
                                onClick={() => handleDelete(message.id, 'message')}
                                className="text-red-600 hover:text-red-900"
                                disabled={loading}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {loading && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
                  <span>Loading...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
 