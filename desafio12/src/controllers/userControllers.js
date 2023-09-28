import UserRepository from "../repository/userRepository.js"
import { createHash, generateToken } from "../utils.js";

// Vista del registro y creacion del usuario
export const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, age, full_name, role } = req.body
        const user = {
            full_name,
            first_name,
            last_name,
            email,
            password: createHash(password),
            age,
            role
        }

        if(user.email === "agustinsanchez@gmail.com"){
            user.role = "admin"
        }else{
            user.role = "user"
        }

        const manager = new UserRepository()
        const result = await manager.createUser(user)
        const access_token = generateToken(result)

        res.cookie('coderTokenCookie', access_token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true
        }).send({"result": result, "jwt": access_token})
   

    } catch (error) {
        console.log('Error in createUser' + error)
    }

}

// Vista del login
export const getUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const manager = new UserRepository()
        const user = await manager.getUser(email, password)
        const access_token = generateToken(user)

        res.cookie('coderTokenCookie', access_token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true
        }).send({"result": user, "jwt": access_token})
        
    } catch (error) {
        console.log('Error in getLogin' + error)
    }
}

// Vista current
export const currentUser = async (req, res) => {
    const { user } = req.user
    console.log(user)
    const manager = new UserRepository()
    const data = await manager.getCurrentUser(user)
    res.send(data)
}

// Vista de cerrar sesion
export const logoutUser = async (req, res) => {
    req.session.destroy((err) => {
        if (!err) {
            res.send("Logout ok!");
        } else {
            res.json({
                status: "Error al cerrar sesion",
                body: err,
            });
        }
    });
}

