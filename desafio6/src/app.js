import express from 'express'
import mongoose from 'mongoose'
import productRouter from './routes/productRouter.js'

// Conectando a mongoose
try {
    await mongoose.connect('mongodb+srv://ecommerce-coder:1234@ecommerce-coder.xd2y4j9.mongodb.net/?retryWrites=true&w=majority')
} catch (error) {
    console.log(error)
}

// Creacion del puerto y conexion a server en express
const PORT = 8080
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas
app.use('/api/products', productRouter)

// Llamando al servidor en puerto
app.listen(PORT, () => {
    console.log(`Server on in port ${PORT}`)
})
