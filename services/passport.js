const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
// const FacebookStrategy = require('passport-facebook')
const TwitterStrategy = require('passport-twitter')
const LocalStrategy = require('passport-local')
const keys = require('../config/keys')
const mongoose = require('mongoose') //importing mongoose instead of User

//instead of importing User as this: const User = require('../models/User'), import it as this so it isn't imported multiple times when testing and then throw error:
//this also means you have to require the models/User file in index.js
const User = mongoose.model('user') //when called with 1 arg it's a getter

//this will create and use the cookie using the '_id' as the identifying piece of info
passport.serializeUser((user, done) => {
    done(null, user.id) //done always called with error as first arg. user.id is shorthand for getting '_id'. assuming no error
})

//this takes the id which is given by the browser on a request and turns it into the user object that is stored in mongo
passport.deserializeUser((id, done) => {
    User.findById(id, (err, data) => {
        done(null, data) //assuming no error, just returning user object found in db
    })
})

//telling passport to use this google strategy and configuring. this is the part in diagram that has "appid=123". when the callback uri is used below, that is where the diagram says "code=456"
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback', //this is where client is redirected to on our server after they grant permission, it's included in the url bar after they grant permission, and needs to be set in the authorized uri's in the credentials section on console.developers.google.com. makes sure the site it's redirected to is ours and not malicious.
    proxy: true //this allows https (instead of http) to be (pre-)appended to callbackURI since heroku will be using a proxy and we can trust it to be secure. otherwise it will try to redirect to http and we don't want that.
}, (accessToken, refreshToken, profile, done) => { //this is called from Step 2 in the authRoutes file
    //accessToken lets you reach back out to google and do whatever client said you could (get contacts, e.g.). refreshToken lets you get a new accessToken after it expires.
    //have to call done with err and user args to finish callback
    User.findOne({googleId: profile.id},(err,user) => {
        if(err){
            console.log('error:',err)
            done(err, null)
        }
        if(user){
            done(null, user)
        }
        if(!user){
            User.create({googleId: profile.id, firstName: profile.name.givenName, lastName: profile.name.familyName, photo: profile.photos[0].value }, (err, data) => {
                done(err, data)
            })
        }
    })
}))

// //same as above google strategy, just for facebook
// passport.use(new FacebookStrategy({
//     clientID: keys.facebookAppId,
//     clientSecret: keys.facebookSecret,
//     callbackURL: '/auth/facebook/callback',
//     proxy:true,
//     profileFields: ['id', 'displayName', 'name', 'picture.type(large)']
// }, (accessToken, refreshToken, profile, done) => {
//     User.findOne({facebookId: profile.id}, (err,user)=>{
//         if(err){
//             console.log('error:',err)
//             done(err, null)
//         }
//         if(user){
//             done(null, user)
//         }
//         if(!user){
//             User.create({facebookId: profile.id, firstName: profile.name.givenName, lastName: profile.name.familyName, photo: profile.photos[0].value }, (err, data) => {
//                 done(err, data)
//             })
//         }
//     })
// }))

//same as above google strategy, just for twitter
passport.use(new TwitterStrategy({
    consumerKey: keys.twitterAppId,
    consumerSecret: keys.twitterSecret,
    callbackURL: '/auth/twitter/callback',
    proxy:true,
    profileFields: ['id', 'displayName', 'name', 'picture.type(large)']
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({twitterId: profile.id}, (err,user)=>{
        if(err){
            console.log('error:',err)
            done(err, null)
        }
        if(user){
            done(null, user)
        }
        if(!user){
            User.create({twitterId: profile.id, firstName: profile.name.givenName, lastName: profile.name.familyName, photo: profile.photos[0].value }, (err, data) => {
                done(err, data)
            })
        }
    })
}))

passport.use(new LocalStrategy(User.authenticate()))