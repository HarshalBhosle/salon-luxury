import { useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'

interface SmartImageProps {
  src?: string | null
  alt?: string
  className?: string
  eager?: boolean
}

export function SmartImage({ src, alt = '', className = '', eager = false }: SmartImageProps) {
  const [error, setError] = useState(false)

  const showImage = Boolean(src) && !error

  if (!showImage) {
    return (
      <div
        aria-hidden
        className={`bg-gradient-to-br from-primary-light to-primary flex items-center justify-center overflow-hidden ${className}`}
      >
        <ImageIcon className="w-8 h-8 text-primary opacity-40" />
      </div>
    )
  }

  return (
    <img
      src={src!}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setError(true)}
      className={className}
    />
  )
}