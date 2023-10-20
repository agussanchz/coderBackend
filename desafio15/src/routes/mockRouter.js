import { Router } from "express";
import { generateProduct } from "../utils.js";


const mockRouter = Router()

mockRouter.get('/', async (req, res) => {
    let products = []
    for (let i=0; i < 100; i++){
        products.push(generateProduct())
    }
    res.send({status:"sucess", payload: products})
})

export default mockRouter