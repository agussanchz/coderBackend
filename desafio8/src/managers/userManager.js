import UserMongooseDao from "../dao/UserMongooseDao.js"


class UserManager {
    constructor() {
        this.userDao = new UserMongooseDao()
    }

    // Creacion del usuario
    async createUser(first_name, last_name, email, password, age) {
        const user = {
            first_name,
            last_name,
            email,
            password,
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
            if (password !== emailExist.password) {
                return { status: 500, message: 'Contraseña incorrecta.' }
            } else {
                return { status: 200, message: 'Usuario y contraseña correcta, inicio de sesion exitosa.' }
            }
        }
    }
}

export default UserManager