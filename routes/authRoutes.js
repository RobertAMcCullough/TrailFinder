const passport = require('passport')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//instead of importing User as this: const User = require('../models/User'), import it as this so it isn't imported multiple times when testing and then throw error:
//this also means you have to require the models/User file in index.js
const User = mongoose.model('user') //when called with 1 arg it's a getter

module.exports = app => {
    //STEP 1
    //sets off passport with google strategy when user goes to /auth/google ('google' arg comes from GoogleStrategy, it's hardcoded to be that there)
    app.get('/auth/google', passport.authenticate('google', { //passport.authenticate is a middleware and is being applied just to this route
        scope: ['profile', 'email']
    }))

    //STEP 2 - similar to above but now the 'code' will be included as a param in the query string/url. so passport knows we already said yes to granting permission and will send back the data we want
    //this is the part of diagram the says 'send request to google with code included'
    //what to do after auth is successful is put the passport.use(new GoogleStrategy()) as the second arg which takes the args as shown in the function. this is were a new user can be added to the database. then the third arg is the next thing to do after passport.authenticate (which is a middleware) is finished
    app.get('/auth/google/callback', passport.authenticate('google'), (req, res)=>{res.redirect('/')})

    // app.get('/auth/facebook', passport.authenticate('facebook')) //step 1 - redirects user to facebook

    // app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res)=>{res.redirect('/')}) //step 2 - facebook redirects 

    app.get('/auth/twitter', passport.authenticate('twitter')) //step 1 - redirects user to facebook

    app.get('/auth/twitter/callback', passport.authenticate('twitter'), (req, res)=>{res.redirect('/')}) 

    app.get('/api/logout', (req,res) => {
        req.logout() //a function attached by passport that removes cookie
        res.redirect('/')
    })

    //just shows the current user which passport stores in req.user
    app.get('/api/current_user', (req,res) => {
        //req.user provides whole user model, req.session provides session which is json that says passport and then user
        res.send(req.user) 
    })

    app.post('/auth/signup', bodyParser.urlencoded({extended:true}), (req,res)=>{
        const newUser = new User({username: req.body.username, firstName:req.body.firstName, lastName:req.body.lastName})
        User.register(newUser, req.body.password, (err, user)=>{
            if(err){
                console.log('error:',err)
                // return res.redirect('/login')
                res.send(`Error. ${err.message}. Please hit the back button and try again.`)
            }else{
                passport.authenticate('local')(req, res, ()=>{
                    res.redirect('/')
                })
            }
        })
    })

    app.post('/auth/login', bodyParser.urlencoded({extended:true}), passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/incorrectLogin"
    }), function(req, res){})

    app.post('/api/updateUser', bodyParser.urlencoded({extended:true}), (req,res)=>{
        //don't want to update fields that weren't filled out (they will come in as empty strings)
        const keys=['firstName', 'lastName', 'location', 'photo']

        let dataToUpdate = {} //dataToUpdate will only include fields from form which contain values other than ''
        for (const key of keys){
            if(req.body[key]!=='') dataToUpdate[key]=req.body[key]
        }

        User.findByIdAndUpdate(req.user.id, dataToUpdate, (err,data)=>{if(err){console.log('error:',err)}})
        res.redirect('/profile')
    })
}