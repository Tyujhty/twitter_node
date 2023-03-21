const { createNewComment } = require('../queries/comment.queries');
const { findTweetById } = require('../queries/tweet.queries')


exports.newComment = async (req, res, next) => {
    const body = req.body;
    const tweetId = req.params.tweetId;
    
    try {
        const [comment, tweet] = await Promise.all([
            createNewComment({...body, author: req.user}),
            findTweetById(tweetId)
        ])

        tweet.comments.push(comment._id);
        tweet.save()
        res.redirect(`/tweet/${tweetId}`);
    } catch (err) {
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        const tweet = await findTweetById(tweetId)
        res.status(400).render('tweets/tweet-show', {
            errors,
            comments: tweet.comments,
            tweet,
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user
        })
    }
}