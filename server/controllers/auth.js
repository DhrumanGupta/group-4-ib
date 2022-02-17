const express = require('express')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const router = express.Router()

const jwtAuthToken = process.env.JWT_AUTH_TOKEN

const authenticateUser = async (req, res, next) => {
    const accessToken = req.cookies.accessToken

    if (!accessToken) {
        return res.status(403).send({ message: 'User not authenticated' })
    }

    jwt.verify(accessToken, jwtAuthToken, async (err, data) => {
        if (data) {
            req.user = data
            next()
            return
        } else if (err.message === 'TokenExpiredError') {
            res.status(403).send({ message: 'Token Expired' })
            return
        }

        console.error(err)
        res.status(403).send({ error: err, message: 'User not authenticated' })
    })
}

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch {
        return res.status(500).send({ msg: 'Error! Something went wrong.' })
    }
    if (!existingUser || existingUser.password !== password) {
        return res.status(400).send({ msg: 'Invalid Credentials' })
    }
    let token

    try {
        token = jwt.sign(
            {
                email: existingUser.email,
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
    const user = await User.findOne({ email })

    return res.status(200).send({
        email: user.email,
        role: user.role,
    })
})

router.post('/register', authenticateUser, async (req, res) => {
    const user = await User.findOne({ email: req.user.email })

    if (user.role !== 'ADMIN') {
        return res.status(403).send({ msg: 'Unauthorized User' })
    }

    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).send({ msg: 'Invalid Parameters' })
    }

    try {
        const user = await User.findOne({ email })
        if (user) {
            return res
                .status(400)
                .send({ msg: 'User with email already exists' })
        }
    } catch (e) {
        return res.status(500).send({ msg: 'Error! Something went wrong.' })
    }

    try {
        await User.create({
            email,
            password,
        })
    } catch (e) {
        console.log(e)
        console.log(e)
        return res.status(500).send({ msg: 'Error! Something went wrong.' })
    }

    return res.status(201).send()
})
// router.post("/new", authenticateUser, async (req, res) => {
//   if (!req.body.header || !req.body.content) {
//     return res.send(400).send({ message: "Invalid Parameters" });
//   }
//
//   const phone = req.phone;
// });

module.exports = router
