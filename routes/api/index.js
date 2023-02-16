const router = require('express').Router()
const apiTweet = require('./api.tweet.routes')


router.use('/tweet', apiTweet)

module.exports = router