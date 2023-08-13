import cartSchema from "../models/cartSchema.js";

class CartMongooseDao {
    // Crear carrito
    async createCart() {
        return await cartSchema.create({ products: [] })
    }

    // Obtener carrito
    async getCartById(id) {
        return await cartSchema.findOne({ _id: id })
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
}

export default CartMongooseDao