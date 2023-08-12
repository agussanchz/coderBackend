import ProductManager from "../managers/productManager.js"

// Crear products
export const createProduct = async (req, res) => {
    try {
        const manager = new ProductManager()
        const products = await manager.createProduct(req.body)
        res.send({ status: 'sucess', products, message: 'Product created.' })
    } catch (error) {
        console.log('Erorr in created products' + error)
    }
}

// Obtener todos los productos
export const getProducts = async (req, res) => {
    try {
        const manager = new ProductManager()
        const { limit, sort, category, page } = req.query
        const products = await manager.getProducts(+limit, sort, category, +page)
        res.send({ status: 'sucess', products })
    } catch (error) {
        console.log('Erorr in getAll products' + error)
    }
}

// Obtener producto por ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const manager = new ProductManager()
        const productId = await manager.getProductById(id)
        res.send({ status: 'sucess', productId })
    } catch (error) {
        console.log('Error in getProductById' + error)
    }
}

// Obtener producto por ID y actualizar informacion
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const manager = new ProductManager()
        const updatedProduct = await manager.updateProduct(id, data)
        res.send({ status: 'sucess', updatedProduct, message: 'Product updated.' })
    } catch (error) {
        console.log('Error in updatedProductById' + error)
    }
}

// Borrar producto por ID
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const manager = new ProductManager()
        const product = await manager.deleteProduct(id)
        res.send({status:'sucess', product, message: 'Product deleted.'})
    } catch (error) {
        console.log('Erorr in deleteProductById' + error)
    }
}