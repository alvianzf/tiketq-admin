import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth`, {
      username,
      password,
    })
    return response.data
  } catch (error) {
    return error
  }
}
