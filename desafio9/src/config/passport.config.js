import passport from 'passport'
import local from 'passport-local'
import GithubStrategy from 'passport-github2'
import userSchema from '../models/userSchema.js'
import { createHash, isValidPassword } from '../utils.js'
import * as dotenv from "dotenv"

// Config dotenv
dotenv.config();
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const CALLBACK_URL = process.env.CALLBACK_URL


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
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: CALLBACK_URL
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