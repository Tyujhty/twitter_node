const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = schema({
    username: {type: String, require: true, unique: true},
    firstname: {type: String, require: true},
    lastname: {type: String, require: true},
    local: {
        email: {type: String, require: true, unique: true},
        password: {type: String, require: true}
    },
    avatar: {
        type: String,
        default: '/images/default-profile.png' //img par défault à l'inscription
    }
}, {
    timestamps: true
})

userSchema.statics.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10) //crypter le mot de passe
        return bcrypt.hash(password, salt)

    } catch (error) {
        throw error
    }
}

//comparer le mot de passe
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.local.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User