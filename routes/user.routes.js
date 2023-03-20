const router = require('express').Router()
const { ensureAuthenticated } = require('../config/security.config.js')
const {  signupForm, signup, uploadImage, displayProfile, userList, deleteUser, followUser, unfollowUser } = require('../controllers/user.controller.js')

//routes pour inscrire un utilisateur
router.get('/', ensureAuthenticated, userList)
router.get('/follow/:userId',ensureAuthenticated, followUser)
router.get('/unfollow/:userId', ensureAuthenticated, unfollowUser)
router.get('/:username', ensureAuthenticated, displayProfile)
router.get('/signup/form', signupForm)
router.post('/signup', signup)
router.post('/update/image', ensureAuthenticated, uploadImage)
router.get('/delete/:username', ensureAuthenticated, deleteUser)


module.exports = router