const {app} = require('../app')
const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy //instance de strategie
const { findUserByEmail, findUserById } = require('../queries/user.queries')

app.use(passport.initialize()) //init passport
app.use(passport.session()) // créa de la session

passport.serializeUser((user, done)=> {
    done(null, user.id)
})

passport.deserializeUser(async (id, done)=> {
    try {
        const user = await findUserById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})

passport.use( //middleware => callback
    'local', //nommer stategie
    new LocalStrategy({usernameField: 'email'}, // quel type d'auth ?
    async (email, password, done) => {
        try {
            const user = await findUserByEmail(email)
            if(user) {
                const match = await user.comparePassword(password)
                if (match) {
                    done(null, user)
                } else {
                    done(null, false, {message: 'Wrong password'}) // user ok mais mauvais psw
                }
            } else {
                done(null, false, {message: 'User not found'})
            }
        } catch (error) {
            done(error)
        }
    })
)

