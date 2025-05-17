import axios from 'axios'
//axios configuration
export const clientUrl = import.meta.env.VITE_BASE_URL_CLIENT || "http://localhost:4000"
const token = localStorage.getItem('token')
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL_BACKEND || "http://localhost:5001/api"
axios.defaults.headers.common = {
  'Content-type': 'application/json',
  Authorization: `Bearer ${token}`,
}
export default axios
