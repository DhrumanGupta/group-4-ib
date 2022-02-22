import axios from 'axios'
import { authRoutes, warehouseRoutes as wareHouseRoutes } from '../data/Routes'

axios.defaults.withCredentials = true

export const getFromId = async (id) =>
  await axios.get(`${wareHouseRoutes.get}/${id}`)

export const getAll = async () => await axios.get(wareHouseRoutes.get)

export const create = async (data) =>
  await axios.post(wareHouseRoutes.create, data)
