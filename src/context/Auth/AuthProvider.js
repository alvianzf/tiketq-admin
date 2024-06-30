/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import * as authService from '../../services/auth/authService'

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('auth')
    return storedAuth ? JSON.parse(storedAuth) : false
  })

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(isAuthenticated))
  }, [isAuthenticated])

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
    localStorage.removeItem('auth') // Clear localStorage on logout
  }

  const value = {
    isAuthenticated,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider }
