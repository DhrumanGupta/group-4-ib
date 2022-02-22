const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const authenticateUser = require('../services/authenticateUser')
router.use(authenticateUser)

const prisma = new PrismaClient()

router.get('/:uid', async (req, res) => {
  const { uid } = req.params

  if (!uid) {
    return res.status(400).send()
  }

  const warehouse = await prisma.warehouse.findUnique({
    where: { id: uid },
    include: { packages: true },
  })

  if (!warehouse) {
    return res.sendStatus(404)
  }

  res.status(200).send({ ...warehouse })
})

router.get('/', async (req, res) => {
  const warehouses = await prisma.warehouse.findMany()
  return res.status(200).send([...warehouses])
})

router.post('/', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.user.email },
  })

  if (user.role !== 'ADMIN') {
    return res.status(403).send({ msg: 'Unauthorized User' })
  }

  const { location } = req.body
  if (!location) return res.sendStatus(400)

  const warehouseExists =
    (await prisma.warehouse.count({ where: { location } })) > 0

  if (warehouseExists) {
    return res.status(401).send({ msg: 'Warehouse already exists' })
  }

  const warehouse = await prisma.warehouse.create({
    data: {
      location,
    },
  })

  return res.status(201).send({ ...warehouse })
})

module.exports = router
