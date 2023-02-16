const Tweet = require('../../database/models/Tweet.model')

const router = require('express').Router()

router.post('/new', (req,res) => {
    const body = req.body
    const newTweet = new Tweet(body)

    newTweet
        .save()
        .then(_ => res.redirect('/')) //_ unused variable
        .catch(err => {
            
            // This code is used to extract error messages from an object containing errors. The code takes the keys of the err.errors object and maps them to the corresponding error message. The result is an array of error messages.
            const errors = Object.keys(err.errors).map(key => err.errors[key].message)
            Tweet
                .find()
                .exec()
                .then(tweets => res.status(400).render('tweets/tweet-list', {errors, tweets}))
        })
})

module.exports = router