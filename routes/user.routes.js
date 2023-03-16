const router = require('express').Router()
const { ensureAuthenticated } = require('../config/security.config.js')
const {  signupForm, signup, uploadImage, displayProfile, userList, deleteUser } = require('../controllers/user.controller.js')

//routes pour inscrire un utilisateur
router.get('/', userList)
router.get('/signup/form', signupForm)
router.post('/signup', signup)
router.post('/update/image', ensureAuthenticated, uploadImage)
router.get('/:username', ensureAuthenticated, displayProfile)
router.get('/delete/:username', ensureAuthenticated, deleteUser)


module.exports = router