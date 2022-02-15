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

router.post('/login', async (req, res, next) => {
    let { email, password } = req.body

    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch {
        const error = new Error('Error! Something went wrong.')
        return next(error)
    }
    if (!existingUser || existingUser.password !== password) {
        const error = Error('Wrong details please check at once')
        return next(error)
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
        const error = new Error('Error! Something went wrong.')
        return next(error)
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
    let user = await User.findOne({ email })

    return res.status(200).send({
        email: user.email,
        role: user.role,
    })
})

// router.post("/new", authenticateUser, async (req, res) => {
//   if (!req.body.header || !req.body.content) {
//     return res.send(400).send({ message: "Invalid Parameters" });
//   }
//
//   const phone = req.phone;
// });

module.exports = router
