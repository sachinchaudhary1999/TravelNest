import React from 'react'



const Button = ({ 

  children, 

  variant = 'primary', 

  size = 'md', 

  disabled = false, 

  className = '', 

  onClick,

  type = 'button',

  ...props 

}) => {

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2'

  

  const variants = {

    primary: 'bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-lg focus:ring-red-500/20',

    secondary: 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:border-black dark:hover:border-white focus:ring-gray-500/20',

    outline: 'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white focus:ring-red-500/20',

    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500/20'

  }

  

  const sizes = {

    sm: 'h-9 px-3 text-sm',

    md: 'h-12 px-6 text-base',

    lg: 'h-14 px-8 text-lg'

  }

  

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''

  

  const classes = `

    ${baseClasses}

    ${variants[variant]}

    ${sizes[size]}

    ${disabledClasses}

    ${className}

  `.trim()

  

  return (

    <button

      type={type}

      className={classes}

      onClick={onClick}

      disabled={disabled}

      {...props}

    >

      {children}

    </button>

  )

}



export default Button