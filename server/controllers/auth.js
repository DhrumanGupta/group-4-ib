const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const authenticateUser = require('../services/authenticateUser')

const prisma = new PrismaClient()

const jwtAuthToken = process.env.JWT_AUTH_TOKEN

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send()
    }

    let user
    try {
        user = await prisma.user.findUnique({ where: { email } })
    } catch (e) {
        return res.status(500).send({ msg: 'Error! Something went wrong.' })
    }
    if (!user || user.password !== password) {
        return res.status(400).send({ msg: 'Invalid Credentials' })
    }
    let token

    try {
        token = jwt.sign(
            {
                email: user.email,
            },
            jwtAuthToken,
            { expiresIn: '1d' }
        )
    } catch (err) {
        console.log(err)
        return res.status(500).send({ msg: 'Error! Something went wrong.' })
    }

    res.status(200)
        .cookie('accessToken', token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            sameSite: 'strict',
            httpOnly: 'true',
        })
        .send()
})

router.post('/logout', (req, res) => {
    res.clearCookie('accessToken').send({ message: 'User Logged Out' })
})

router.get('/user', authenticateUser, async (req, res) => {
    const email = req.user.email
    const user = await prisma.user.findUnique({ where: { email } })

    return res.status(200).send({
        email: user.email,
        role: user.role,
        name: user.name,
    })
})

router.post('/register', authenticateUser, async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { email: req.user.email },
    })

    if (user.role !== 'ADMIN') {
        return res.status(403).send({ msg: 'Unauthorized User' })
    }

    const { email, password, name } = req.body
    if (!email || !password || !name) {
        return res.status(400).send({ msg: 'Invalid Parameters' })
    }

    try {
        const user = await prisma.user.count({
            where: { email },
        })
        if (user > 0) {
            return res
                .status(400)
                .send({ msg: 'User with email already exists' })
        }
    } catch (e) {
        return res.status(500).send({ msg: 'Error! Something went wrong.' })
    }

    try {
        await prisma.user.create({
            data: {
                email,
                password,
                name,
            },
        })
    } catch (e) {
        return res.status(500).send({ msg: 'Error! Something went wrong.' })
    }

    return res.status(201).send()
})

module.exports = router
