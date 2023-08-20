import { Router } from "express";
import { addProductInCart, createCart, deleteCart, deleteProductInCart, getCartById, updateCart, updateQuantity } from "../controllers/cartControllers.js";


const cartRouter = Router()

cartRouter.post('/', createCart)
cartRouter.get('/:id', getCartById)
cartRouter.delete('/:id', deleteCart)
cartRouter.post('/:cid/products/:pid', addProductInCart)
cartRouter.delete('/:cid/products/:pid', deleteProductInCart)
cartRouter.put('/:cid/products/:pid', updateQuantity)
cartRouter.put('/:cid', updateCart)


export default cartRouter