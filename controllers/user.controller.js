const { createNewUser } = require("../queries/user.queries")

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
        next(error)
    }
}