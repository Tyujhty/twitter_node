const { ensureAuthenticated } = require('../config/security.config')
const { createTweet, deleteTweet, editTweet, updateTweet, showTweet, tweetLike, shareTweet } = require('../controllers/tweet.controller')


// This code is used to create a router object in Express.js. The router object is used to define routes and associated HTTP methods (GET, POST, PUT, DELETE, etc.) that will be used to handle incoming requests. The router object also provides methods for handling middleware, which is code that is executed before a request is handled.
const router = require('express').Router()


router.post('/new',ensureAuthenticated, createTweet)
router.get('/like/:tweetId', tweetLike)
router.get('/delete/:tweetId', deleteTweet)
router.get('/edit/:tweetId', editTweet) //Affiche le tweet pour la modification
router.post('/edit/:tweetId', updateTweet) // Maj du tweet
router.get('/share/:tweetId', shareTweet)
router.get('/:tweetId', showTweet)


module.exports = router