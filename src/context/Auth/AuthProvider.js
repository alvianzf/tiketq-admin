/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { AuthContext } from './AuthContext'
import * as authService from '../../services/auth/authService'

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (username, password) => {
    try {
      const loginResult = await authService.login(username, password)
      setIsAuthenticated(true)
      return loginResult
    } catch (error) {
      console.error('Error logging in:', error)
      throw error
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  const value = {
    isAuthenticated,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider }
