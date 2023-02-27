const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = schema({
    username: {type: String, require: true},
    firstname: {type: String, require: true},
    lastname: {type: String, require: true},
    local: {
        email: {type: String, require: true},
        password: {type: String, require: true}
    }
}, {
    timestamps: true
})

const User = mongoose.model('user', userSchema)

module.exports = User