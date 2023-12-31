import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import errorHandler from './middlewares/errors/index.js'
import { addLogger } from './middlewares/loggers/logger.js'
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import sessionRouter from './routes/sessionRouter.js'
import mockRouter from './routes/mockRouter.js'
import loggerTest from './routes/loggerTest.js'
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
// middleware de Logger
app.use(addLogger)
app.use('/api/loggerTest', loggerTest)

// Rutas
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/session', sessionRouter)
app.use('/api/mockingproducts', mockRouter)
app.use(errorHandler)


// Llamando al servidor en puerto
app.listen(PORT, () => {
    console.log(`Server on in port ${PORT}`)
})
