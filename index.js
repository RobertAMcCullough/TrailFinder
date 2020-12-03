const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')

require('./models/Users') //importing this here since using an alternative import statement in the passport file for importing model files could throw errors when testing
require('./services/passport') //don't need to asign to a variable since there is no exported code, just code that needs to run once

const keys = require('./config/keys')

const PORT = process.env.PORT || 5000

console.log('connecting to ' + keys.dbURL)

mongoose.connect(keys.dbURL, {useNewUrlParser: true, useUnifiedTopology: true}).catch(error=>console.log('ERROR! '+error))

const app = express()

//initialize aws xray sdk - must install the xray daemon on machine for this to work
// const AWSXRay = require('aws-xray-sdk')

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in mS
    keys: [keys.cookieKey] //random key for encrypting id into cookie
}))
app.use(passport.initialize())
app.use(passport.session())
// app.use(bodyParser.urlencoded({extended:true})) //need this for un/pw form data to work - include as middleware in route
app.use(bodyParser.json())
//this must be added before routes
// app.use(AWSXRay.express.openSegment('TrailFinder'))


require('./routes/authRoutes')(app)
require('./routes/trailRoutes')(app)

//only runs in production mode/on heroku or AWS. Needs to come after express routes are defined
if(process.env.NODE_ENV==='production'){
    //have express serve up production assets like main.js or main.css files
    //this has to go before the next line of code since the next line catches everything
    //code says that if it doesn't know where a file is then check here:
    app.use(express.static('client/build'))

    //have express serve up html file if it doesn't recognize the route, has to be the last route handler listed because it catches everything that made it this far
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

//this must be added after routes
// app.use(AWSXRay.express.closeSegment())

app.listen(PORT, ()=>{console.log("Server listening on port " + PORT)})