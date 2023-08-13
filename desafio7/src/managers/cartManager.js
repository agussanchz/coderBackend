import CartMongooseDao from "../dao/CartMongooseDao.js"
import ProductMongooseDao from "../dao/ProductMongooseDao.js";

class CartManager {
    constructor() {
        this.cartDao = new CartMongooseDao()
        this.productDao = new ProductMongooseDao()
    }
    // Crear carrito 
    async createCart() {
        return this.cartDao.createCart()
    }

    // Obtener carrito 
    async getCartById(id) {
        return this.cartDao.getCartById(id)
    }

    // Eliminar carrito
    async deleteCart(id) {
        return this.cartDao.deleteCart(id)
    }

    // Actualizar carrito (agregando producto) 
    async addProductInCart(cartId, productId) {
        const cart = await this.cartDao.getCartById({ _id: cartId })
        const product = await this.productDao.getProductById({ _id: productId })

        if (product) {
            cart.products.push({ product: product.id })
        } else {
            console.log('This product no exist')
        }

        return this.cartDao.addProductInCart(cartId, cart)
    }

    // Eliminar producto dentro del carrito seleccionado
    async deleteProductInCart(cartId, productId) {
        const cart = await this.cartDao.getCartById({ _id: cartId })
        const newCart = cart.products.filter((product) => product.id !== productId)
        return this.cartDao.deleteProductInCart(cartId, { products: newCart })
    }
}

export default CartManager