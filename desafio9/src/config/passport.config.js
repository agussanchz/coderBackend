import passport from 'passport'
import local from 'passport-local'
import GithubStrategy from 'passport-github2'
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
                return done('Erro al obtener usuario' + error)
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

    // login con passport y github
    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.b7ce04b1b3e092e1',
        clientSecret: '59a52d58493c378c029cca0c3557cba9f457b8ba',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile)
                let user = await userSchema.findOne({ email: profile._json.email })
                if (!user) {
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: '',
                        age: 25,
                        email: profile._json.email,
                        password: ''
                    }
                    let result = await userSchema.create(newUser)
                    done(null, result)
                } else {
                    done(null, user)
                }
            } catch (error) {
                done(null, user)
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