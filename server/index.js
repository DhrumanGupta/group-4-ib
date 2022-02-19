require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const auth = require('./controllers/auth')
const warehouse = require('./controllers/warehouse')

const PORT = 1337

const isProd = (process.env.NODE_ENV || 'development') === 'production'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(
    cors({
        origin: isProd ? 'https://backend.mysite.com' : 'http://localhost:5000',
        credentials: true,
    })
)

app.use('/auth', auth)
app.use('/warehouse', warehouse)

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})
