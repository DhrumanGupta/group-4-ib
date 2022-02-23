import axios from 'axios'
import { packageRoutes } from '../data/Routes'

axios.defaults.withCredentials = true

export const getFromId = async (id) =>
  await axios.get(packageRoutes.getFromId(id))

export const getAll = async () => await axios.get(packageRoutes.getAll)

export const getMine = async () => await axios.get(packageRoutes.getMine)

export const take = async (packageId) =>
  await axios.post(packageRoutes.take, { packageId })

export const sanitize = async (packageId) =>
  await axios.post(packageRoutes.sanitize, { packageId })

export const give = async ({ packageId, warehouseId }) =>
  await axios.post(packageRoutes.give, { packageId, warehouseId })

export const create = async ({ deliveryLocation, warehouseId }) =>
  await axios.post(packageRoutes.create, { deliveryLocation, warehouseId })
