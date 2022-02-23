const { PrismaClient } = require('@prisma/client')

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomPackageId = async () => {
  const prisma = new PrismaClient()
  let id = getRandomInt(1000, 9999999)
  let isUnique = (await prisma.package.count({ where: { id } })) <= 0
  while (!isUnique) {
    id = getRandomInt(1000, 9999999)
    isUnique = (await prisma.package.count({ where: { id } })) <= 0
  }
  await prisma.$disconnect()
  return id
}

module.exports = {
  getRandomPackageId,
  getRandomInt,
}
