import { Router } from "express";
import { auth, createUser, getUser, logoutUser } from "../controllers/userControllers.js";


const sessionRouter = Router()

sessionRouter.get('/login', getUser)
sessionRouter.post('/singup', createUser)
sessionRouter.get("/logout", logoutUser)
sessionRouter.get("/privado", auth, (req, res) => {
    res.render("topsecret", {});
});


export default sessionRouter