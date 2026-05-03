import React, { createContext, useState } from 'react'
export const authDataContext = createContext()

function AuthContext({ children }) {
  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000"
  const [loading, setLoading] = useState(false)

  return (
    <authDataContext.Provider value={{ serverUrl, loading, setLoading }}>
      {children}
    </authDataContext.Provider>
  )
}

export default AuthContext
