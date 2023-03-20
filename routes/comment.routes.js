const { newComment } = require('../controllers/comment.controller')

const router = require('express').Router()

router.post('/new/:tweetId', newComment)

module.exports = router