const Comment = require("../database/models/Comment.model")

exports.createNewComment = (body) => {
    const newComment = new Comment(body)
    return newComment.save()
}