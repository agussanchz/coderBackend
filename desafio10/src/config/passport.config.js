import passport from 'passport'
import local from 'passport-local'
import userSchema from '../models/userSchema.js'
import { createHash, isValidPassword } from '../utils.js'

const LocalStrategy = local.Strategy

const initializePassport = () => {
    // Registro con passport
    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email'
        },
        async (req, email, password, done) => {
            const { first_name, last_name, age } = req.body
            try {
                let user = await userSchema.findOne({ email: email })
                if (user) {
                    console.log('User already exist')
                    return done(null, false)
                }

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    password: createHash(password),
                    age
                }

                let result = await userSchema.create(newUser)
                return done(null, result)
            } catch (error) {
                return done('Error in get user' + error)
            }
        }
    ))

    // Login con passport
    passport.use('login', new LocalStrategy(
        {
            usernameField: 'email'
        },
        async (email, password, done) => {
            try {
                const user = await userSchema.findOne({ email: email })
                if (!user) {
                    console.log('User not exist')
                    return done(null, false)
                }
                if (!isValidPassword(user, password)) return done(null, false)
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))

    // Serializador y deserializador general
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userSchema.findById(id)
        done(null, user)
    })
}

export default initializePassport