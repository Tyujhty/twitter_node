const Tweet = require('../database/models/Tweet.model')

exports.createNewTweet = (body) => {
    const newTweet = Tweet(body)
    return newTweet.save()
}

exports.findAllTweets = () => {
    return Tweet.find({}).populate('author').exec() //populate : pour chaque tweet on récupère les infos de l'auteur
}

exports.findTweetAndDelete = (tweetId) => {
    return Tweet.findByIdAndDelete(tweetId).exec()
}

exports.findTweetById = (tweetId) => {
    return Tweet.findById(tweetId).exec()
}

exports.findTweetAndUpdate = (tweetId, body) => {
    return Tweet.findByIdAndUpdate(tweetId, {$set: body}).exec() //The $set operator replaces the value of a field with the specified value.
}