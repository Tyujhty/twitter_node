const Tweet = require('../database/models/Tweet.model')

exports.createNewTweet = (body) => {
    const newTweet = Tweet(body)
    return newTweet.save()
}

exports.findAllTweets = () => {
    return Tweet.find({}).exec()
}

exports.findTweetAndDelete = (tweetId) => {
    return Tweet.findByIdAndDelete(tweetId).exec()
}

exports.findTweetAndUpdate = (tweetId) => {
    return Tweet.findByIdAndUpdate(tweetId).exec()
}