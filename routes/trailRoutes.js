const mongoose = require('mongoose')
const axios= require('axios')
const requireAuth = require('../middlewares/requireAuth')
const keys = require('../config/keys')


const User = mongoose.model('user')

module.exports = app => {
    //does search on backend to not expose key
    app.get('/api/trails', async (req,res) => {
        const {lat, lon} = req.query;

        const options = {
            method: 'GET',
            url: 'https://trailapi-trailapi.p.rapidapi.com/trails/explore/',
            params: {
              lat,
              lon,
              per_page: 10,
              radius: 10,
            },
            headers: {
              'X-RapidAPI-Key': keys.XRapidAPIKey, 
              'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
            }
          };
            
        console.log(`making trails api request for ${lat}, ${lon}`);
        const rapidApiTrailList = await axios.request(options);

        res.send(rapidApiTrailList.data.data) 
    })

    //toggles items in wishlist (favorites) array
    app.post('/api/wishlist', requireAuth, async(req,res)=>{
        //if user model already has wishlisted trail in array, then remove it
        if(req.user.wishList.find(el=>el.id===req.body.trail.id)){
            req.user.wishList.splice(req.user.wishList.findIndex(el=>el.id===req.body.trail.id),1)
        }else{ //else add it
            req.user.wishList.push(req.body.trail)
        }
        req.user.save().then(newUser=>{res.send(newUser)})
    })
    
    //toggles items in completed array
    app.post('/api/completed', requireAuth, async(req,res)=>{
        //if user model already has wishlisted trail in array, then remove it
        if(req.user.completed.find(el=>el.id===req.body.trail.id)){
            req.user.completed.splice(req.user.completed.findIndex(el=>el.id===req.body.trail.id),1)
        }else{ //else add it
            req.user.completed.push(req.body.trail)
        }
        req.user.save().then(newUser=>{res.send(newUser)})
    })
    
}