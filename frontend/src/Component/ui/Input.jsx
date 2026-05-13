import React from 'react'



const Input = ({ 

  label, 

  type = 'text', 

  placeholder, 

  error, 

  disabled = false, 

  className = '', 

  ...props 

}) => {

  const baseClasses = 'input-primary'

  const errorClasses = error ? 'border-red-500 focus:ring-red-500/20' : ''

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''

  

  const classes = `

    ${baseClasses}

    ${errorClasses}

    ${disabledClasses}

    ${className}

  `.trim()

  

  return (

    <div className="space-y-2">

      {label && (

        <label className="block text-sm font-medium text-gray-700 dark:text-brand-slate-300">

          {label}

        </label>

      )}

      <input

        type={type}

        className={classes}

        placeholder={placeholder}

        disabled={disabled}

        {...props}

      />

      {error && (

        <p className="text-sm text-red-500 dark:text-red-400">

          {error}

        </p>

      )}

    </div>

  )

}



export default Input