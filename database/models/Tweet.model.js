const mongoose = require('mongoose')
const schema = mongoose.Schema

const tweetSchema = schema({
    content: {
        type: String,
        maxlenght: [146, 'Le tweet est trop long !'],
        minlength: [5, 'Le tweet est trop court !'],
        required: [ true, "Le tweet ne peut être vide"]
    }
}, {
    timestamps: true
})

const Tweet = mongoose.model('tweet', tweetSchema)

module.exports = Tweet