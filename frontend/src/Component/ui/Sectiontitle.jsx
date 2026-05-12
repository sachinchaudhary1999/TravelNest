import React from 'react'

const SectionTitle = ({ 
  title, 
  subtitle, 
  centered = false, 
  className = '',
  titleClassName = '',
  subtitleClassName = ''
}) => {
  const containerClasses = `
    ${centered ? 'text-center' : 'text-left'}
    ${className}
  `.trim()
  
  return (
    <div className={containerClasses}>
      <h2 className={`section-title ${titleClassName}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`section-subtitle ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionTitle