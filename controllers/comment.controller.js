const { createNewComment } = require('../queries/comment.queries');
const { findTweetById } = require('../queries/tweet.queries')


exports.newComment = async (req, res, next) => {
    try {
        const body = req.body;
        const tweetId = req.params.tweetId;

        const [comment, tweet] = await Promise.all([
            createNewComment({...body, author: req.user}),
            findTweetById(tweetId)
        ])

        tweet.comments.push(comment._id);
        tweet.save()
        res.redirect(`/tweet/${tweetId}`);
    } catch (error) {
        next(error)
    }
}