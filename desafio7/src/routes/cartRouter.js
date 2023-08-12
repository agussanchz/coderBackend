import { Router } from "express";
import { addProductInCart, createCart, deleteCart, getCartById } from "../controllers/cartControllers.js";


const cartRouter = Router()

cartRouter.post('/', createCart)
cartRouter.get('/:id', getCartById)
cartRouter.delete('/:id', deleteCart)
cartRouter.post('/:cid/products/:pid', addProductInCart)

export default cartRouter