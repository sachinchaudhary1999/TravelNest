import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

function Star({ onRate, value = 0, readOnly = false, size = "w-8 h-8" }) {
  const [hover, setHover] = useState(0)

  return (
    <div className='flex gap-1'>
      {[1, 2, 3, 4, 5].map(star => (
        <FaStar
          key={star}
          className={`${size} cursor-pointer transition ${(hover || value) >= star ? "text-yellow-400" : "text-gray-300"}`}
          onClick={() => !readOnly && onRate && onRate(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
        />
      ))}
    </div>
  )
}

export default Star
