const mongoose = require('mongoose')
const schema = mongoose.Schema

const tweetSchema = schema({
    content: {
        type: String,
        maxlenght: [146, 'The tweet is too long'],
        minlength: [5, 'The tweet is too short!'],
        required: [ true, "The content can't be empty"]
    },
    author: {
        type: schema.Types.ObjectId,
        ref: 'user',
        required: true
    }, 
    comments: {
        type: [schema.Types.ObjectId],
        ref: 'comment',
    },
    nbLikes: {type: Number, default: 0}
}, {
    timestamps: true
})

const Tweet = mongoose.model('tweet', tweetSchema)

module.exports = Tweet