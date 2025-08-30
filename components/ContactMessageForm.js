import { useState, useEffect } from 'react'

const ContactMessageForm = ({ 
  message, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    status: 'pending',
    response: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (message) {
      setFormData({
        status: message.status || 'pending',
        response: message.response || ''
      })
    }
  }, [message])

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
    
    if (formData.status === 'responded' && !formData.response.trim()) {
      newErrors.response = 'Response is required when marking as responded'
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

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Manage Contact Message
      </h3>
      
      {/* Message Details */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Message Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><span className="font-medium">From:</span> {message?.name}</p>
            <p><span className="font-medium">Email:</span> {message?.email}</p>
            <p><span className="font-medium">Phone:</span> {message?.phone}</p>
          </div>
          <div>
            <p><span className="font-medium">Date:</span> {message?.createdAt ? formatDate(message.createdAt) : 'N/A'}</p>
            <p><span className="font-medium">Status:</span> 
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                message?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                message?.status === 'responded' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {message?.status?.charAt(0).toUpperCase() + message?.status?.slice(1)}
              </span>
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-medium">Message:</p>
          <p className="text-gray-700 mt-1 bg-white p-3 rounded border">{message?.message}</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="pending">Pending</option>
            <option value="responded">Responded</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Response {formData.status === 'responded' && '*'}
          </label>
          <textarea
            name="response"
            value={formData.response}
            onChange={handleInputChange}
            rows="4"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.response ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={formData.status === 'responded' ? 'Enter your response to the customer...' : 'Optional response...'}
          ></textarea>
          {errors.response && <p className="text-red-500 text-sm mt-1">{errors.response}</p>}
          <p className="text-sm text-gray-500 mt-1">
            {formData.status === 'responded' ? 'This response will be sent to the customer.' : 'Add a response if needed.'}
          </p>
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
            Update Message
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactMessageForm
