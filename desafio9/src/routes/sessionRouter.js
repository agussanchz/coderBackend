import { Router } from "express";
import { createUser, getUser, logoutUser } from "../controllers/userControllers.js";


const sessionRouter = Router()

sessionRouter.get('/login', getUser)
sessionRouter.post('/singup', createUser)
sessionRouter.get("/logout", logoutUser)

export default sessionRouter