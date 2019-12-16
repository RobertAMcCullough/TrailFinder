const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')

require('./models/Users') //importing this here since using an alternative import statement in the passport file for importing model files could throw errors when testing
require('./services/passport') //don't need to asign to a variable since there is no exported code, just code that needs to run once


const keys = require('./config/keys')

const PORT = process.env.PORT || 5000

mongoose.connect(keys.dbURL, {useNewUrlParser: true, useUnifiedTopology: true})

const app = express()

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in mS
    keys: [keys.cookieKey] //random key for encrypting id into cookie
}))
app.use(passport.initialize())
app.use(passport.session())
// app.use(bodyParser.urlencoded({extended:true})) //need this for un/pw form data to work - include as middleware in route
app.use(bodyParser.json())


require('./routes/authRoutes')(app)
require('./routes/trailRoutes')(app)

app.get('/',(req,res)=>{
    res.send('working')
})

app.listen(PORT)