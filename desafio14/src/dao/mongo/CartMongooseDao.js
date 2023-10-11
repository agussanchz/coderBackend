import cartSchema from "../models/cartSchema.js"


class CartMongooseDao {
    // Crear carrito
    async createCart() {
        return await cartSchema.create({ products: [] })
    }

    // Obtener carrito
    async getCartById(id) {
        const cart = await cartSchema.findOne({ _id: id })
        return cart
    }

    // Eliminar carrito 
    async deleteCart(id) {
        return await cartSchema.deleteOne({ _id: id })
    }

    // Actualizar carrito (agregando producto)
    async addProductInCart(cartId, cart) {
        return await cartSchema.updateOne({ _id: cartId }, cart)
    }

    // Eliminar producto dentro del carrito seleccionado
    async deleteProductInCart(cartId, newCart) {
        return await cartSchema.findOneAndUpdate({ _id: cartId }, newCart)
    }

    // Actualizar carrito completo
    async updateCart(cartId, updatedCart) {
        return await cartSchema.updateOne({ _id: cartId }, updatedCart)
    }

    // Actualizar cantidad de un producto dentro del cart
    async updateQuantity(cartId, cart) {
        return await cartSchema.findOneAndUpdate({ _id: cartId }, cart)
    }
}

export default CartMongooseDao