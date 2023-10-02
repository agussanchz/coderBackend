import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productControllers.js";

const productRouter = Router()

productRouter.post('/', createProduct)
productRouter.get('/', getProducts)
productRouter.get('/:id', getProductById)
productRouter.put('/:id', updateProduct)
productRouter.delete('/:id', deleteProduct)


export default productRouter