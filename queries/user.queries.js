const { findOne, findById } = require('../database/models/User.model')
const User = require('../database/models/User.model')


exports.createNewUser = async (user) => {
    try {
        const hashedPassword = await User.hashPassword(user.password)

        const newUser = User({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            local: {
                email: user.email,
                password: user.hashedPassword
            }
        })
    
        return newUser.save()
        
    } catch (error) {
        throw error
    }
}

exports.findUserByEmail = (email) => {
    return findOne({'local.email': email}).exec() //passer l'email de la base pour retourner une promesse
}

exports.findUserById = (id) => {
    return findById(id).exec()
}