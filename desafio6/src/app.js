import express from 'express'
import mongoose from 'mongoose'
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import * as dotenv from "dotenv";
// Config dotenv
dotenv.config();

// Conectando a mongoose
const URL_MONGOOSE = process.env.URL_MONGOOSE

try {
    await mongoose.connect(URL_MONGOOSE)
} catch (error) {
    console.log(error)
}

// Creacion del puerto y conexion a server en express
const PORT = process.env.PORT || 8080
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

// Llamando al servidor en puerto
app.listen(PORT, () => {
    console.log(`Server on in port ${PORT}`)
})
