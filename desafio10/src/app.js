import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import sessionRouter from './routes/sessionRouter.js'
import * as dotenv from "dotenv"
import passport from 'passport'
import initializePassport from './config/passport.config.js'

// Config dotenv
dotenv.config();
const PORT = process.env.PORT || 8080
const URL_MONGOOSE = process.env.URL_MONGOOSE


// Creacion del puerto y conexion a server en express
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Cookies
app.get('/setCookie', (req, res) => {
    res.cookie('CoderCookie', 'Cookie del servidor', { maxAge: 10000 }).send('Cookie')
})

app.get('/getCookie', (req, res) => {
    res.send(req.cookies)
})

app.get('/deleteCookie', (req, res) => {
    res.clearCookie('CoderCookie').send('Cookie removed')
})


// Iniciando passport
initializePassport();
app.use(passport.initialize())
app.use(passport.session())


// Conectando a mongoose
try {
    await mongoose.connect(URL_MONGOOSE)
    console.log("BD connected");
} catch (error) {
    console.log(error)
}

// Rutas
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/session', sessionRouter)


// Llamando al servidor en puerto
app.listen(PORT, () => {
    console.log(`Server on in port ${PORT}`)
})
