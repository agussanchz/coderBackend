import { Router } from "express";
import { logoutUser } from "../controllers/userControllers.js";
import passport from "passport";


const sessionRouter = Router()

// login con passport
sessionRouter.post('/login', passport.authenticate('login', {failureRedirect:'/failLogin'}), async (req, res) => {
    if(!req.user) return res.status(400).send({status: 'error', error: 'Invalid credentials'})
    req.session.user = {
        first_name: req.session.first_name,
        last_name: req.session.last_name,
        age: req.session.age,
        email: req.session.email 
    }  
    res.send({status: 'sucess', payload: req.user})    
})

sessionRouter.get('/failLogin', async (req, res) => {
    console.log('failed login')
})

// registro con passport
sessionRouter.post('/register', passport.authenticate('register', { failureRedirect: '/faileRegister' }), async (req, res) => {
    res.send({ status: 'sucess', message: 'User registered' })
})

sessionRouter.get('/failRegister', async (req, res) => {
    console.log('failed strategy')
})


// agregar ruta current

// cierre de sesion
sessionRouter.get("/logout", logoutUser)

export default sessionRouter