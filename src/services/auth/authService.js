import axios from 'axios'
import { API } from '../api'

export const login = async (username, password) => {
  try {
    const response = await axios.post(API.login(), {
      username,
      password,
    })
    return response.data
  } catch (error) {
    return error
  }
}
