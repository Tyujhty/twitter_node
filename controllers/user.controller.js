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
        res.render('users/signup-form', {
            errors: [error.message],
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user
        })
    }
}