const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const authenticateUser = require('../services/authenticateUser')

const prisma = new PrismaClient()

router.use(authenticateUser)

router.get('/mine', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.user.email },
  })

  const packages = await prisma.package.findMany({
    where: { heldById: user.id },
  })

  return res.status(200).send([...packages])
})

router.get('/:uid', async (req, res) => {
  const { uid } = req.params

  if (!uid) {
    return res.status(400).send()
  }

  const package = await prisma.package.findUnique({ where: { id: uid } })

  if (!package) {
    return res.sendStatus(404)
  }

  res.status(200).send({ ...package })
})

router.get('/', async (req, res) => {
  const packages = await prisma.package.findMany()
  res.status(200).send([...packages])
})

router.post('/take', async (req, res) => {
  const { packageId } = req.body
  if (!packageId) return res.sendStatus(400)

  const package = await prisma.package.findUnique({
    where: { id: packageId },
  })

  if (!package)
    return res
      .status(401)
      .send({ msg: `"Package with id: ${packageId} not found` })

  if (!package.warehouseId) {
    return res.status(400).send({ msg: 'Package is not in a warehouse' })
  }

  await prisma.warehouse.update({
    where: { id: package.warehouseId },
    data: {
      packages: {
        disconnect: {
          id: package.id,
        },
      },
    },
  })

  await prisma.user.update({
    where: { email: req.user.email },
    data: {
      packagesHeld: {
        connect: {
          id: package.id,
        },
      },
    },
  })

  return res.sendStatus(200)
})

router.post('/sanitize', async (req, res) => {
  const { packageId } = req.body
  if (!packageId) return res.sendStatus(400)

  const package = await prisma.package.findUnique({
    where: { id: packageId },
    select: {
      warehouseId: true,
      sanitized: true,
    },
  })

  if (!package)
    return res
      .status(404)
      .send({ msg: `"Package with id: ${packageId} not found` })

  if (package.sanitized) {
    return res.status(400).send({ msg: 'Package already sanitized' })
  }

  if (package.warehouseId) {
    return res
      .status(400)
      .send({ msg: 'Please take the package before sanitizing it' })
  }

  await prisma.package.update({
    where: { id: packageId },
    data: {
      sanitized: true,
    },
  })

  res.sendStatus(201)
})

router.post('/give', async (req, res) => {
  const { packageId, warehouseId } = req.body
  if (!packageId || !warehouseId) return res.sendStatus(400)

  const package = await prisma.package.findUnique({
    where: { id: packageId },
  })

  const user = await prisma.user.findUnique({
    where: { email: req.user.email },
  })

  if (!package)
    return res
      .status(401)
      .send({ msg: `"Package with id: ${packageId} not found` })

  if (!package.heldById || package.heldById !== user.id) {
    return res.status(400).send({ msg: "Can't give this package" })
  }

  if ((await prisma.warehouse.count({ where: { id: warehouseId } })) <= 0) {
    return res
      .status(400)
      .send({ msg: `Warehouse with id ${warehouseId} not found` })
  }

  await prisma.user.update({
    where: { email: req.user.email },
    data: {
      packagesHeld: {
        disconnect: {
          id: package.id,
        },
      },
    },
  })

  await prisma.warehouse.update({
    where: { email: req.user.email },
    data: {
      packages: {
        connect: {
          id: package.id,
        },
      },
    },
  })

  return res.sendStatus(200)
})

router.post('/', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.user.email },
  })

  if (user.role !== 'ADMIN') {
    return res.status(403).send({ msg: 'Unauthorized User' })
  }

  const { deliveryLocation, warehouseId } = req.body
  if (!deliveryLocation || !warehouseId) return res.sendStatus(400)

  if ((await prisma.warehouse.count({ where: { id: warehouseId } })) <= 0) {
    return res
      .status(401)
      .send({ msg: `Warehouse with id: ${warehouseId} not found` })
  }

  const package = await prisma.package.create({
    data: {
      deliveryLocation,
    },
  })

  await prisma.warehouse.update({
    where: {
      id: warehouseId,
    },
    data: {
      packages: {
        connect: {
          id: package.id,
        },
      },
    },
  })

  return res.status(201).send(package)
})

module.exports = router
