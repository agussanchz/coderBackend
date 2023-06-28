const fs = require('fs')

class ProductManager {
    constructor() {
        this.product = []
        this.path = './products.json'
    }

    // Obtener productos
    async getProducts() {
        try {
            const productFile = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(productFile)
        } catch (error) {
            await fs.promises.writeFile(this.path, '[]')
            return 'This file no exist. One has already been created with an empty array'
        }
    }

    // Agregar producto
    async addProduct(product) {
        try {
            if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
                return 'One of the data has been entered incorrectly, please verify'
            }

            const existFile = fs.existsSync(this.path)

            if (existFile) {
                const productFile = await fs.promises.readFile(this.path, 'utf-8')
                let newProduct = JSON.parse(productFile)

                const verifyCode = newProduct.find((p) => p.code === product.code)

                if (verifyCode) {
                    return 'The product is already in the list'
                }

                let lastProduct = undefined

                if (newProduct.length > 0) {
                    lastProduct = newProduct[newProduct.length - 1].id + 1
                }

                newProduct.push({
                    ...product,
                    id: lastProduct || 1
                })

                await fs.promises.writeFile(this.path, JSON.stringify(newProduct, null, 2))

                return 'Product added successfully'
            } else {
                await fs.promises.writeFile(this.path, JSON.stringify([{ ...product, id: 1 }], null, 2))
                return 'Product added successfully'
            }

        } catch (error) {
            throw new Error(error)
        }
    }

    // Obtener producto segun el id
    async getProductsById(id) {
        try {
            const productFile = await fs.promises.readFile(this.path, 'utf-8')
            let newProduct = JSON.parse(productFile)

            const productId = newProduct.find((product) => product.id === id)

            if (!productId) {
                return 'Not Found'
            }

            return productId
        } catch (error) {
            throw new Error(error)
        }
    }

    // Actualizar data de un producto
    async updateProduct(id, productData) {
        try {
            const productFile = await fs.promises.readFile(this.path, 'utf-8')
            let newProduct = JSON.parse(productFile)

            const newProductData = newProduct.map((p) => {
                const newData = p.id === id ? { ...p, ...productData } : p
                return newData
            })

            await fs.promises.writeFile(this.path, JSON.stringify(newProductData, null, 2))

            return 'Updated product successfully'
        } catch (error) {
            throw new Error(error)
        }

    }

    // Borrar un producto segun su id
    async deleteProduct(id) {
        try {
            const productFile = await fs.promises.readFile(this.path, 'utf-8')
            let newProduct = JSON.parse(productFile)

            const filterProduct = newProduct.filter((p) => p.id !== id)

            await fs.promises.writeFile(this.path, JSON.stringify(filterProduct, null, 2))

            return 'Updated file successfully'
        } catch (error) {
            throw new Error(error)
        }

    }
}


//Creacion de productos
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
    code: 'abc1234',
    stock: 25
}

const product3 = {
    title: 'Producto Prueba 3',
    description: 'Este es un producto prueba',
    price: 300,
    thumbnail: 'Sin imagen',
    code: 'abc1235',
    stock: 26
}

//Llamando a la clase
const productTest = new ProductManager()

const main = async () => {
    // console.log(await productTest.getProducts())


    console.log(await productTest.addProduct(product1))
    console.log(await productTest.addProduct(product2))
    // console.log(await productTest.addProduct(product3))


    // console.log('producto recuperado segun su id:', await productTest.getProductsById(2))

    // console.log(await productTest.updateProduct(1, {...product1, code: 'modifica2'}))

    // console.log(await productTest.deleteProduct(2))
}

main()


