import { Router } from "express";
import { createUser, currentUser, getUser } from "../controllers/userControllers.js";
import { passportCall } from "../utils.js";

const sessionRouter = Router()

// Registro con jwt
sessionRouter.post('/register', createUser)

// Login con jwt
sessionRouter.post('/login', getUser)

// Route current 
sessionRouter.get('/current', passportCall('jwt'), currentUser)


export default sessionRouter