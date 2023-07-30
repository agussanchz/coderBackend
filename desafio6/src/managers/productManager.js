import ProductMongooseDao from "../dao/ProductMongooseDao.js";

class ProductManager {
    constructor() {
        this.productDao = new ProductMongooseDao()
    }

    async getProducts() {
        return this.productDao.getProducts()
    }

    async createProduct(data) {
        return this.productDao.createProduct(data)
    }

    async getProductById(id) {
        return this.productDao.getProductById(id)
    }

    async updateProduct(id, data) {
        return this.productDao.updateProduct(id, data)
    }

    async deleteProduct(id) {
        return this.productDao.deleteProduct(id)
    }
}


export default ProductManager