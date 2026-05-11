import React, { createContext, useState } from 'react'
export const authDataContext = createContext()

function AuthContext({ children }) {
 const serverUrl =
    import.meta.env.VITE_SERVER_URL ||
    "https://travelnest-backend-4q1w.onrender.com"

     console.log("Server URL:", serverUrl)
  const [loading, setLoading] = useState(false)

  return (
    <authDataContext.Provider value={{ serverUrl, loading, setLoading }}>
      {children}
    </authDataContext.Provider>
  )
}
export default AuthContext