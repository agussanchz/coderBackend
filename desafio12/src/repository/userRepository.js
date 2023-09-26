import UserDTO from "../dao/DTO/userDTO.js"
import UserMongooseDao from "../dao/mongo/UserMongooseDao.js"
import { isValidPassword } from "../utils.js"


class UserRepository {
    constructor() {
        this.userDao = new UserMongooseDao()
    }

    // Creacion del usuario
    async createUser(user) {
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
}

export default UserRepository