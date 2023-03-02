const router = require('express').Router()
const { ensureAuthenticated } = require('../config/security.config.js')
const {  signupForm, signup, uploadImage, displayProfile } = require('../controllers/user.controller.js')

//routes pour inscrire un utilisateur
router.get('/signup/form', signupForm)
router.post('/signup', signup)
router.post('/update/image', ensureAuthenticated, uploadImage)
router.get('/:username', ensureAuthenticated, displayProfile)


module.exports = router