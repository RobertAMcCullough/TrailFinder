const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')

const User = mongoose.model('user')

module.exports = app => {
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