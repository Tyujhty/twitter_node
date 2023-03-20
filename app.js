const express = require('express')
const morgan = require('morgan')
const path = require('path')
const index = require('./routes')
const errorHandler = require('errorhandler')
require('./database')

const app = express()
exports.app = app // délocaliser app
app.locals.moment = require('moment')
const PORT = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

require('./config/session.config')
require('./config/passport.config')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('short'))

app.use(index)

if(process.env.NODE_ENV === 'dev') {
    app.use(errorHandler())
} else {
    app.use((err, req, res, next) => {
        const code = err.code || 500
        res.status(code).json({
            code,
            message: code === 500 ? null : err.message
        })
    })
}

app.listen(PORT)