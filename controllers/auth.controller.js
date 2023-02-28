const passport = require('passport')

exports.signinForm = async (req, res, next) => {
    try {
        res.render('auth/signin-form', {
            errors: null,
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user
        })
    } catch (error) {
        next(error)
    }
}
exports.signin = async (req, res, next) => {
    passport.authenticate('local', (err, user, info)=> {
        if(err) {
            next(err)
        } else if (!user) {
            
            res.render('auth/signin-form', 
            {errors: [info.message],            
                isAuthenticated: req.isAuthenticated(),
                currentUser: req.user})
        } else {
            req.login(user, (err) => {
                if(err) {
                    next(err)
                } else {
                    res.redirect('/')
                }
            })
        }
    })(req, res, next)
}
exports.signout = async (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err)
        res.redirect('/')
    })
}

