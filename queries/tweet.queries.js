const Tweet = require('../database/models/Tweet.model')

exports.createNewTweet = (body) => {
    const newTweet = Tweet(body)
    return newTweet.save()
}

exports.findAllTweets = () => {
    return Tweet
        .find({})
        .populate('author') //populate : pour chaque tweet on récupère les infos de l'auteur
        // .populate({
        //     path: 'retweeted',
        //     populate: {
        //         path: 'initialAuthor'
        //     }
        // })
        .populate('retweeted.initialAuthor')
        .sort('-createAt')
        .exec() 
}

exports.findTweetAndDelete = (tweetId) => {
    return Tweet
        .findByIdAndDelete(tweetId)
        .exec()
}

exports.findTweetById = (tweetId) => {
    return Tweet
        .findById(tweetId)
        .populate('author')
        .populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        })
        .populate({
            path: 'retweeted',
            populate: {
                path: 'initialAuthor'
            }
        })
        .sort('-createdAt')
        .exec()
}

exports.findTweetAndUpdate = (tweetId, body) => {
    return Tweet
        .findByIdAndUpdate(tweetId, {$set: body})//The $set operator replaces the value of a field with the specified value.
        .exec() 
}

exports.getCurrentUserTweetsWithFollowing = (user) => {
    return Tweet
        .find({author: {$in: [...user.followings, user._id]}})
        .populate('author')
        .populate({
            path: 'retweeted',
            populate: {
                path: 'initialAuthor'
            }
        })
        .sort('-createdAt')
        .exec() //destructuring data 
}

exports.findTweetsFromUserName = (authorId) => {
    return Tweet
        .find( {author: authorId} )
        .populate('author')
        .populate({
            path: 'retweeted',
            populate: {
                path: 'initialAuthor'
            }
        })
        .sort('-createdAt')
        .exec()
}

exports.likeTweet = async (tweetId, user) => {
    const tweet = await Tweet.findById(tweetId).exec()

    if(!user.likedTweets.includes(tweet._id)) {
        tweet.nbLikes++
        user.likedTweets.push(tweet._id)
    } else {
        tweet.nbLikes--
        user.likedTweets = user.likedTweets.filter(tId => tId.toString() !== tweetId.toString())
    }
    user.save()
    return tweet.save()
}

exports.retweet = async (tweetId, userId) => {
    const tweet = await Tweet.findById(tweetId)
    const sharedTweet = new Tweet({
        content: tweet.content,
        author: userId,
        retweeted: {
            status: true,
            initialAuthor: tweet.author._id
        }
    })
    return sharedTweet.save()
}