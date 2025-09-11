import { useState, useEffect } from 'react'
import Link from 'next/link'

const NotificationBox = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if notification was previously dismissed
    const dismissed = localStorage.getItem('notificationDismissed')
    if (!dismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('notificationDismissed', 'true')
  }

  if (!isVisible || isDismissed) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-red-600 text-white p-4 rounded-lg shadow-2xl max-w-sm animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-2xl">📢</div>
          <div>
            <p className="font-bold text-sm">Admissions Open!</p>
            <p className="text-xs">Free & Paid IT Courses</p>
          </div>
        </div>
        
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="ml-2 text-white hover:text-gray-300 transition-colors duration-200 p-1"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <Link 
        href="/courses" 
        className="block mt-2 bg-white text-red-600 text-xs font-semibold py-1 px-3 rounded text-center hover:bg-gray-100 transition-colors duration-200"
      >
        Apply Now
      </Link>
    </div>
  )
}

export default NotificationBox
