const mongoose = require('mongoose')

mongoose.connect('mongodb://fanny:admin@127.0.0.1:27017/twitter_dwwm', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connexion à la db établie')
}).catch((err) => {
    console.log(err)
})