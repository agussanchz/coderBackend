import { Router } from "express";
import { createUser, currentUser, getUser } from "../controllers/userControllers.js";
import { passportCall, validateRoleAdmin, validateRoleUser } from "../utils.js";

const sessionRouter = Router()

// Registro con jwt
sessionRouter.post('/register', createUser)

// Login con jwt
sessionRouter.post('/login', getUser)

// Route current 
sessionRouter.get('/current', passportCall('jwt'), validateRoleUser,  currentUser)


export default sessionRouter