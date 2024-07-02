const express = require('express')
const router = express.Router();
const {isLoggedIn} = require('../../middleware');
const Product = require('../../models/Product');
const User = require('../../models/User');

router.post('/products/:id/like', isLoggedIn , async (req,res)=>{
    let {id} = req.params;

    let user = req.user;

    let isLiked = user.wishlist.includes(id);

    console.log(isLiked);

    if(isLiked){
        await User.findByIdAndUpdate(req.user._id , {$pull : {wishlist : id}});
    }
    else{
        await User.findByIdAndUpdate(req.user._id , {$addToSet : {wishlist : id}});

    }



})


module.exports = router;


