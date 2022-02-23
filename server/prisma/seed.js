const { PrismaClient } = require('@prisma/client')
const faker = require('faker')
const { getRandomPackageId } = require('../services/random')
const prisma = new PrismaClient()

const randomAddress = () => {
  return `${faker.address.secondaryAddress()}, ${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()}, ${faker.address.country()}`
}

const makePackages = async (length) => {
  const array = []
  for (let i = 0; i < length; i++) {
    array.push({
      deliveryLocation: randomAddress(),
      id: await getRandomPackageId()
    })
  }

  return array;
}

const createWarehouse = async () => {
  const warehouseAddress = randomAddress()
  await prisma.warehouse.upsert({
    where: {
      location: warehouseAddress,
    },
    update: {},
    create: {
      location: warehouseAddress,
      name: faker.address.county(),
      packages: {
        createMany: {
          data: await makePackages(faker.datatype.number({ min: 8, max: 20 }))
        },
      },
    },
  })
}

async function main() {
  await prisma.user.upsert({
    where: { email: 'dhruman.basketball@gmail.com' },
    update: {},
    create: {
      email: `dhruman.basketball@gmail.com`,
      role: 'ADMIN',
      password: 'test',
      name: 'Dhruman Gupta',
    },
  })

  await prisma.user.upsert({
    where: { email: 'test@gmail.com' },
    update: {},
    create: {
      email: `test@gmail.com`,
      password: 'test',
      name: 'Test User',
    },
  })

  for (let i = 0; i < faker.datatype.number({ min: 8, max: 13 }); i++) {
    await createWarehouse()
  }

  console.log('created')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
