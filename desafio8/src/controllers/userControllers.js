import UserManager from "../managers/userManager.js"

// Verificacion de autorizacion
export const auth = async (req, res, next) => {
    try {
        if (req.session?.user === "coderHouse" && req.session?.admin) {
            return next();
        }
        return res.status(401).json("Error de autenticacion");
    } catch (error) {
        console.log('Error in auth' + error)
    }
}

// Vista del registro y creacion del usuario
export const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, age } = req.body
        const manager = new UserManager()
        const newUser = await manager.createUser(first_name, last_name, email, password, age)
        if (newUser) {
            req.session.user = user.email
            req.session.admin = true
        }
        res.send({ status: 'sucess', newUser, message: 'User created.' })
    } catch (error) {
        console.log('Error in createUser' + error)
    }

}

// Vista del login
export const getUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const manager = new UserManager()
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

