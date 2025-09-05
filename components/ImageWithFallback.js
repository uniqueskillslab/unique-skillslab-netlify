import { useState } from 'react'

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackSrc = "/assets/placeholder-image.jpg", 
  className = "", 
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc)
      setHasError(true)
    }
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  )
}

export default ImageWithFallback
