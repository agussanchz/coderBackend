import UserRepository from "../repository/userRepository.js"


// Vista del registro y creacion del usuario
export const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, age } = req.body
        const manager = new UserRepository()
        const newUser = await manager.createUser(first_name, last_name, email, password, age)
        res.send({ status: 'sucess', newUser, message: 'User created.' })
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
        if (user.status === 200) {
            req.session.user = user.email
            req.session.admin = true
        }
        res.send(user)
    } catch (error) {
        console.log('Error in getLogin' + error)
    }
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

