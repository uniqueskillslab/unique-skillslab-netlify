// Utility functions for handling file downloads

export const downloadFile = async (url, filename) => {
  try {
    // Create a temporary anchor element
    const link = document.createElement('a')
    link.href = url
    link.download = filename || 'download'
    link.target = '_blank'
    
    // Append to body, click, and remove
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    return true
  } catch (error) {
    console.error('Download failed:', error)
    return false
  }
}

export const downloadPDF = async (pdfUrl, courseTitle, onDownloadStart, onDownloadComplete) => {
  try {
    // Show download started message
    if (onDownloadStart) {
      onDownloadStart()
    }
    
    // If it's a relative path, make it absolute
    const fullUrl = pdfUrl.startsWith('http') ? pdfUrl : `${window.location.origin}${pdfUrl}`
    
    // Get file extension from URL
    const fileExtension = pdfUrl.split('.').pop().toLowerCase()
    
    // Generate filename from course title with proper extension
    const filename = `${courseTitle.replace(/[^a-zA-Z0-9]/g, '_')}_Course_Structure.${fileExtension}`
    
    // Try to download the file
    const success = await downloadFile(fullUrl, filename)
    
    if (!success) {
      // Fallback: open in new tab
      window.open(fullUrl, '_blank')
    }
    
    // Show download complete message
    if (onDownloadComplete) {
      onDownloadComplete(success)
    }
    
    return success
  } catch (error) {
    console.error('File download failed:', error)
    // Fallback: open in new tab
    window.open(pdfUrl, '_blank')
    
    // Show error message
    if (onDownloadComplete) {
      onDownloadComplete(false)
    }
    
    return false
  }
}

export const downloadDocument = async (docUrl, docTitle, fileType = 'pdf') => {
  try {
    const fullUrl = docUrl.startsWith('http') ? docUrl : `${window.location.origin}${docUrl}`
    const filename = `${docTitle.replace(/[^a-zA-Z0-9]/g, '_')}_Document.${fileType}`
    
    const success = await downloadFile(fullUrl, filename)
    
    if (!success) {
      window.open(fullUrl, '_blank')
    }
    
    return success
  } catch (error) {
    console.error('Document download failed:', error)
    window.open(docUrl, '_blank')
    return false
  }
}
