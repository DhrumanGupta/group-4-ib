import axios from 'axios'
import { authRoutes } from '../data/Routes'

axios.defaults.withCredentials = true

export const getUser = async () => {
  const resp = await axios.get(authRoutes.getUser)
  return resp.data
}

export const login = async (data) => {
  return axios.post(authRoutes.login, data)
}

export const logout = async () => {
  await axios.post(authRoutes.logout)
}
