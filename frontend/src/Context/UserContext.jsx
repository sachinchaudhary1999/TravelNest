import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { authDataContext } from './AuthContext'

export const userDataContext = createContext()

function UserContext({ children }) {
  const { serverUrl } = useContext(authDataContext)
  const [userData, setUserData] = useState(null)
  const [userLoading, setUserLoading] = useState(true)

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/user/currentuser", { withCredentials: true })
      setUserData(result.data)
    } catch (error) {
      setUserData(null)
    } finally {
      setUserLoading(false)
    }
  }

  useEffect(() => { getCurrentUser() }, [])

  return (
    <userDataContext.Provider value={{ userData, setUserData, getCurrentUser, userLoading }}>
      {children}
    </userDataContext.Provider>
  )
}

export default UserContext
