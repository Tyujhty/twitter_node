const {app} = require('../app')
const session = require('express-session')
const MongoStore = require('connect-mongo')

app.use(session({
    secret: 'Here is my secret key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000*60*60*24*14, // 14 days cookies
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://fanny:admin@127.0.0.1:27017/twitter_dwwm',
        ttl: 60 * 60 * 24 * 14
    })
}))
