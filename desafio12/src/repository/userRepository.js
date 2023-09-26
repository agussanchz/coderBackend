import UserMongooseDao from "../dao/UserMongooseDao.js"
import { createHash, isValidPassword } from "../utils.js"


class UserRepository {
    constructor() {
        this.userDao = new UserMongooseDao()
    }

    // Creacion del usuario
    async createUser(first_name, last_name, email, password, age) {
        let user = {
            first_name,
            last_name,
            email,
            password: createHash(password),
            age
        }
        return this.userDao.createUser(user)
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