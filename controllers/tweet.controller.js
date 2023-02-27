const { findByIdAndUpdate } = require("../database/models/Tweet.model")
const { createNewTweet, findAllTweets, findTweetAndDelete } = require("../queries/tweet.queries")

exports.createTweet = async (req, res, next) => {
    try {
        const body = req.body

        await createNewTweet(body)

        res.redirect('/')

    } catch (err) {
        const errors = Object.keys(err.errors).map(key => err.errors[key].message)
        const tweets = await findAllTweets()
        res.status(400).render('tweets/tweet-list', {errors, tweets})
    }
}

exports.tweetList = async (req, res, next) => {
    try {
        const tweets = await findAllTweets()
        res.render('tweets/tweet-list', { tweets })
    } catch (error) {
        next(error)
    }
}

exports.deleteTweet = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId

        await findTweetAndDelete(tweetId)
        res.redirect('/')
    } catch (error) {
        next(error)
    }
}

exports.editTweet = async(req, res, next) => {
    try {
        const tweetId = req.params.tweetId

        await findByIdAndUpdate(tweetId)
        res.redirect('/')

    } catch (error) {
        next(error)
    }
}