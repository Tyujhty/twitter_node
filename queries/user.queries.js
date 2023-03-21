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
                password: hashedPassword
            }
        })
    
        return newUser.save()
        
    } catch (error) {
        throw error
    }
}

exports.findUserByEmail = (email) => {
    return User.findOne({'local.email': email}).exec() //passer l'email de la base pour retourner une promesse
}

exports.findUserById = (id) => {
    return User.findById(id).exec()
}

exports.findUserByUsername = (username) => {
    return User.findOne({username: username}).exec()
}

exports.findUserByQuerySearch = (search) => {
    const regExp = `^${search}`
    const reg = new RegExp(`${regExp}`, "i")
    return User.find({username: {$regex: reg}}).exec()
}

exports.findUserAndDelete = (usernameId) => {
    return User.findByIdAndDelete(usernameId).exec()
}

exports.addUserToCurrentFollowingList = async (currentUser,userId) => {
    currentUser.followings = [...currentUser.followings, userId]
    const user= await this.findUserById(userId)
    user.followers = [...user.followers, currentUser._id]
    user.save()
    return currentUser.save()
}

exports.removeUserToCurrentUserFollowingList = async (currentUser,userId) => {
    currentUser.followings = currentUser.followings.filter(objId => objId.toString() !== userId)
    const user= await this.findUserById(userId.toString())
    user.followers = currentUser.followers.filter(objId => objId.toString() !== currentUser._id.toString())
    user.save()
    return currentUser.save()
}