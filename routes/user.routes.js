const router = require('express').Router()
const {  signupForm, signup } = require('../controllers/user.controller.js')

//routes pour inscrire un utilisateur
router.get('/signup/form', signupForm)
router.post('/signup', signup)

module.exports = router