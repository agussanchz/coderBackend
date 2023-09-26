import UserDTO from "../dao/DTO/userDTO.js"
import UserMongooseDao from "../dao/mongo/UserMongooseDao.js"
import { isValidPassword } from "../utils.js"


class UserRepository {
    constructor() {
        this.userDao = new UserMongooseDao()
    }

    // Creacion del usuario
    async createUser(user) {
        const exist = await this.userDao.getUser(user.email)
        if (exist) return res.status(400).send({ status: 'error', error: 'User already exist' })

        const newUser = new UserDTO(user)
        return this.userDao.createUser(newUser)
    }

    // Verifico si el usuario existe
    async getUser(email, password) {
        const emailExist = await this.userDao.getUser(email)

        if (!emailExist) {
            return { status: 500, message: 'Usuario incorrecto o inexistente.' }
        } else {
            if (!isValidPassword(emailExist, password)) {
                return { status: 500, message: 'Contraseña incorrecta.' }
            } else {
                return { status: 200, message: 'Usuario y contraseña correcta, inicio de sesion exitosa.' }
            }
        }
    }

    async getCurrentUser(user) {
        const exist = await this.userDao.getUser(user.email)

        if (!exist) {
            return { status: 500, message: 'Usuario sin permisos.' }
        } else {
            const newUser = new UserDTO(user)
            return { status: 200, message: "Bienvenido " + newUser.full_name }
        }
    }
}

export default UserRepository