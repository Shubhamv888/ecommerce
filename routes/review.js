const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const app = express();
const router = express.Router();
const {validateReview , isLoggedIn} = require('../middleware')


router.post('/products/:id/review' , isLoggedIn, validateReview ,  async (req,res) =>{
    try{
        let {id} = req.params;
        let {rating , review} = req.body;
        // console.log(id);

        let product = await Product.findById(id); //returns the product found

        let revieww = new Review({rating , review}); // create a new review

        product.reviews.push(revieww); // add the review to the reviews array

        await product.save(); // save the product found
        await revieww.save(); // save the review
        // console.log(product);

        // first arg is key and the second is the value ==> check documentation
        req.flash('success' , 'review added successfully');
        res.redirect(`/products/${id}`);
    }
    catch(e){
        res.render('error' , {err : e.message});
    }


})




module.exports = router;

