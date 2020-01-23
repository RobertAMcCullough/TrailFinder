const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    googleId: String,
    facebookId: String,
    twitterId: String,
    firstName: String,
    lastName: String,
    wishList: [],
    completed: [],
    username: String,
    password: String, //hashed and salted automatically by passport-local-mongoose
    photo: {type: String, default: 'Enter Profile Photo URL'},
    dateCreated: {type: Date, default: Date.now()},
    location: {type: String, default: 'Unspecified'}
})

userSchema.plugin(passportLocalMongoose) //add passport methods to userSchema

module.exports = mongoose.model('user', userSchema)