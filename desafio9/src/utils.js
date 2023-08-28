import bcrypt from 'bcrypt'

// Hasheando la contraseña
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Validacion de contraseña
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);


