const app = require('../app')
const session = require('express-session')
const mongoStore = require('connect-mongo')

app.use(session({
    secret: 'Here is my secret key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000*60*60*24*14 // 14 days cookies
    }
}))
