import productModel from "../models/productSchema.js";

class ProductMongooseDao {
    // Obtener todos los productos
    async getProducts() {
        const product = await productModel.find()

        return product.map((document) => (
            {
                id: document._id,
                title: document.title,
                description: document.description,
                code: document.code,
                price: document.price,
                status: document.status,
                stock: document.stock,
                category: document.category,
                thumbnail: document.thumbnail
            }
        ))
    }

    // Crear productos
    async createProduct(data) {
        const product = await productModel.create(data)

        return {
            id: product._id,
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            status: product.status,
            stock: product.stock,
            category: product.category,
            thumbnail: product.thumbnail
        }
    }

    // Obtener producto por ID
    async getProductById(id) {
        const product = await productModel.findOne({ _id: id })

        return {
            id: product._id,
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            status: product.status,
            stock: product.stock,
            category: product.category,
            thumbnail: product.thumbnail
        }
    }

    // Acutalizar producto por ID
    async updateProduct(id, data) {
        const product = await productModel.updateOne({ _id: id }, data)
        return product
    }

    // Borrar producto por ID
    async deleteProduct(id) {
        return productModel.deleteOne({ _id: id })
    }
}

export default ProductMongooseDao