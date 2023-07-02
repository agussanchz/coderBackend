import ProductManager from "./ProductManager.js"
import express from 'express'

const productManager = new ProductManager()

const app = express()

const PORT = 8080

app.use(express.urlencoded({ extended: true }));

// Obtener todos los productos y poner un limite de cuantos traer por url
app.get('/products', async (req, res) => {
    try {
        const limit = +req.query.limit
        const data = await productManager.getProducts()  
        if (!limit) {
            return res.send(data)
        } else {
            const dataWithLimit = []
            for (let i = 0; i < limit; i++) {
                dataWithLimit.push(data[i])
            }
            return res.send(dataWithLimit)
        }      
    } catch (error) {
        throw new Error(error)
    }
})

// Obtener producto por id
app.get('/products/:pid', async (req, res) => {
    const productId = +req.params.pid
    const data = await productManager.getProductsById(productId)
    res.send(data)
})

// Llamando al servidor en puerto
app.listen(PORT, () => {
    console.log(`Server on in port ${PORT}`)
})

