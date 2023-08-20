import { Router } from "express";
import { getLogin } from "../controllers/loginControllers.js";

const loginRouter = Router()

loginRouter.get('', getLogin)

export default loginRouter