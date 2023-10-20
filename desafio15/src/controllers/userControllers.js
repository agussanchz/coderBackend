import UserRepository from "../repository/userRepository.js"
import { createHash, generateToken } from "../utils.js";
import CustomError from "../services/errors/CustomErrors.js";
import EErrors from "../services/errors/enums.js";
import { generateUserErrorInfo } from "../services/errors/info.js";
import MailingService from "../services/mailing/mailing.js";

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

        if(!first_name || !last_name || !email){
            CustomError.createError({
                name: 'User creation error',
                cause: generateUserErrorInfo({first_name, last_name,email}),
                message: 'Error in create User',
                code: EErrors.INVALID_TYPES_ERROR
            })
        }

        if(user.email === "agustinsanchez@gmail.com"){
            user.role = "admin"
        }else{
            user.role = "user"
        }

        const manager = new UserRepository()
        const result = await manager.createUser(user)
        const access_token = generateToken(result)
        const mailer = new MailingService();
        const resultMailer = await mailer.sendSimpleMail({
            from: "CoderTests",
            to: "Aquí el correo para enviar ",
            subject: "Usuario creado!",
            html: `<div><h1>¡Felicidades!</h1>
        <p> Bienvenido ${user.email}. Esperamos que lo pases muy bien y aprendas mucho</p>
        </div>`,
        });
        console.log(resultMailer);


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

