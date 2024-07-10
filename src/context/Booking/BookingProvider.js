/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { BookingContext } from './BookingContext'
import * as bookDataService from '../../services/book-data/bookDataService'
import { AuthContext } from '../Auth/AuthContext'

const BookingProvider = ({ children }) => {
  const [bookData, setBookData] = useState([])
  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    if (isAuthenticated) {
      getBookData()
    }
  }, [isAuthenticated])

  const getBookData = async () => {
    try {
      const data = await bookDataService.getBookData()
      setBookData(data)
      localStorage.setItem('book-data', JSON.stringify(data))
    } catch (error) {
      console.log(error)
    }
  }

  const value = {
    bookData,
    getBookData,
  }

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

BookingProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { BookingProvider }
