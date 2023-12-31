
class ProductManager {
    constructor() {
        this.product = []
    }

    #id = 0

    // Agregar producto al carrito
    addProduct({ title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return 'One of the data has been entered incorrectly, please verify'
        }

        const verifyCode = this.product.find((product) => product.code === code)

        if (verifyCode) {
            return 'The product is al ready in the list'
        }

        const product = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }

        this.product.push({ ...product, id: this.#id += 1 })
        return 'Product added successfully'
    }

    // Obtener productos
    getProducts() {
        return this.product
    }

    // Obtener producto por id
    getProductsById(id) {
        const productId = this.product.find((product) => product.id === id)
        if (!productId) {
            return 'Not Found'
        }
        return productId
    }

}


const productManager = new ProductManager()


const product1 = {
    title: 'Producto Prueba 1',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
}

const product2 = {
    title: 'Producto Prueba 2',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
}

// Agregar producto1 al carrito
productManager.addProduct(product1)
// Agregar producto2 al carrito, pero arroja que ya existe al tener el mismo codigo
productManager.addProduct(product2)
// Obtener el carrito
productManager.getProducts()
// Obtener el producto con el id seleccionado
productManager.getProductsById(1)
// Obtener el producto con el id seleccionado, (Tira not found) al no encontrarlo
productManager.getProductsById(4)