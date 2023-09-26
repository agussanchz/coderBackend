import { createHash } from "../../utils"


export default class UserDTO {
    constructor(user) {
        first_name = user.first_name, 
        last_name = user.last_name, 
        email = user.email, 
        password = createHash(user.password), 
        age = user.age
    }
}