import axios from 'axios'
import { API } from '../api'

export const getBookData = async () => {
  try {
    const response = await axios.get(API.listBookings())
    return response
  } catch (err) {
    return err
  }
}

export const getIssued = async (bookingCode, nominal) => {
  try {
    const response = await axios.post(API.issueBooking(), { bookingCode, nominal })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const checkTicket = async (bookingCode) => {
  try {
    const response = await axios.get(API.cekIssued(bookingCode))
    return response.data
  } catch (err) {
    console.log(err)
  }
}
