const { createNewUser, findUserByUsername, findUserByQuerySearch, findUserAndDelete, addUserToCurrentFollowingList, removeUserToCurrentUserFollowingList, findUserById } = require("../queries/user.queries")
const multer = require('multer')
const path = require('path') //permet de stocker une image uploadée dans un chemin précis et créer un chemin entre le user <=> avatar
const { findTweetsFromUserName, findTweetAndDelete } = require("../queries/tweet.queries")

const upload = multer({
    storage: multer.diskStorage({
        destination:(req, file, cb) => {
            cb(null, path.join(__dirname, '../public/images/avatars')) // va s'enregistrer dans le fichier
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`) // en prenant comme nom la date de création
        }
    })
})

exports.signupForm = async (req, res, next) => {
    try {
        res.render('users/signup-form', {errors: null})
    } catch (error) {
        next(error)
    }
}
exports.signup = async (req, res, next) => {
    try {
        const body = req.body
        await createNewUser(body)
        res.redirect('/')
    } catch (error) {
        res.render('users/signup-form', {
            errors: [error.message],
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user
        })
    }
}

// Array de middleware => permet de gérer des middleware imbriqués
exports.uploadImage = [
    upload.single('avatar'), // 
    async (req, res, next) => { 
    try {
        const user = req.user
        user.avatar = `/images/avatars/${req.file.filename}` // déjà passé par le multer pour le nommage
        await user.save() // attente de l'enregistrement par l'utilisateur
        res.redirect('/') //redirection aorès enregistrement
    } catch (error) {
        next(error)
    }
}]

exports.displayProfile = async (req, res, next) => {
    try {
        const username = req.params.username
        const user = await findUserByUsername(username) //je trouve l'auteur
        const tweets = await findTweetsFromUserName(user._id) // je trouve tous les tweet de l'auteur

        res.render('users/profile-show', {tweets, user, isAuthenticated: req.isAuthenticated(), currentUser: req.user })
    } catch (error) {
        next(error)
    }
}

exports.userList = async(req, res, next) => {
    try {
        const search = req.query.search
        const users = await findUserByQuerySearch(search)
        res.render('includes/search-result', {users})
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async(req, res, next) => {
    try {
        const usernameId = req.user
        const tweets = await findTweetsFromUserName(usernameId)

        await findUserAndDelete(usernameId)
        await findTweetAndDelete(tweets)
        res.redirect('/')
        
    } catch (error) {
        next(error)
    }
}

exports.followUser = async(req, res, next) => {
    try {
        const userId = req.params.userId
        const [_, user] = await Promise.all([
            addUserToCurrentFollowingList(req.user, userId),
            findUserById(userId)
        ])
        res.redirect(`/user/${user.username}`)

    } catch (error) {
        next(error)
    }
}
exports.unfollowUser = async(req, res, next) => {
    try {
        const userId = req.params.userId
        const [_, user] = await Promise.all ([
            removeUserToCurrentUserFollowingList(req.user, userId),
            findUserById(userId)
        ])
        res.redirect(`/user/${user.username}`)

    } catch (error) {
        next(error)
    }
}