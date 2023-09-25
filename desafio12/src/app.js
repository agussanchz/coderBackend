import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import sessionRouter from './routes/sessionRouter.js'
import initializePassport from './config/passport.config.js'
import passport from 'passport'
import * as dotenv from "dotenv"

// Config dotenv
dotenv.config();
const PORT = process.env.PORT || 8080
const URL_MONGOOSE = process.env.URL_MONGOOSE


// Creacion del puerto y conexion a server en express
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cookies y passport
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())


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
