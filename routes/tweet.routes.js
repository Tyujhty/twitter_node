const { createTweet, deleteTweet, editTweet } = require('../controllers/tweet.controller')


// This code is used to create a router object in Express.js. The router object is used to define routes and associated HTTP methods (GET, POST, PUT, DELETE, etc.) that will be used to handle incoming requests. The router object also provides methods for handling middleware, which is code that is executed before a request is handled.
const router = require('express').Router()

// router.get('/new', (req, res) => {
//     res.render('tweets/tweet-form')
// })

router.post('/new', createTweet)
router.get('/delete/:tweetId', deleteTweet)
router.get('/edit/:tweetId', editTweet)


module.exports = router