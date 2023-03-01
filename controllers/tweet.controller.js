
const { createNewTweet, findAllTweets, findTweetAndDelete, findTweetById, findTweetAndUpdate } = require("../queries/tweet.queries")

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
        res.render('tweets/tweet-list', { 
            tweets, 
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user 
        })

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

exports.displayTweet = async(req, res, next) => {
    try {
        const tweetId = req.params.tweetId
        const tweet = await findTweetById(tweetId) 
        res.render('tweets/tweet-edit', { tweet, isAuthenticated: req.isAuthenticated, currentUser: req.user })

    } catch (error) {
        next(error)
    }
}

exports.updateTweet = async(req, res, next) => {
    try {
        const tweetId = req.params.tweetId
        const body = req.body
        await findTweetAndUpdate(tweetId, body)
        res.redirect('/')
    } catch (error) {
        next(error)
    }
}