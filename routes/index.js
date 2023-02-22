const router = require('express').Router()
const tweet = require('./tweet.routes')
const { tweetList } = require('../controllers/tweet.controller')

// This code is setting up a route for the router object. The route is '/tweet' and it is using the tweet object as the handler for the route. This means that when a request is made to the '/tweet' route, the tweet object will be used to handle the request.
router.use('/tweet', tweet)
router.get('/', tweetList)


module.exports = router