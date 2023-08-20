import { Router } from "express";
import { getSignup } from "../controllers/signupControllers.js";

const signupRouter = Router()

signupRouter.get('', getSignup)

export default signupRouter