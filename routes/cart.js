const express = require('express');
const router = express.Router();
const {validateReview , isLoggedIn} = require('../middleware');
const User = require('../models/User');
const Product = require('../models/Product');
const stripe = require('stripe')('sk_test_51PXo1YDqhfPdN2kfvOgjq8YRxPh0fxiyxCg5l1t7fNArVA0eF7VmvcGOZuK5VWZrP4JzjC8xvSmH1gPZ5ETIekaR00AWLW5kXG')

router.get('/user/cart' , isLoggedIn , async (req,res)=>{
    let userId = req.user._id;
    let user = await User.findById(userId).populate('cart');

    let totalAmount = 0;

    for(let item of user.cart){
        totalAmount += item.price;
    }


    res.render('cart/cart' , {user,totalAmount});
})


router.post('/user/:prodId/add' , isLoggedIn , async (req,res)=>{

    let {prodId} = req.params;
    let userId = req.user._id;

    let user = await User.findById(userId);
    let product = await Product.findById(prodId);

    user.cart.push(product);

    await user.save();

    res.redirect('/user/cart');
})

router.get('/checkout', async (req, res) => {

    let userId = req.user._id;

    let totalAmount = 0;

    let user = await User.findById(userId).populate('cart');

    let line_items = [];

    for(let item of user.cart){
        totalAmount += item.price;
        line_items.push({
            price_data: {
            currency: 'inr',
            product_data: {
                name: `${item.name}`,
            },
            unit_amount: item.price*100,
            },
            quantity: 1,
        })
    }

    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        success_url: 'http://localhost:8080/products',
        cancel_url: 'http://localhost:8080/products',
    });

  res.redirect(303, session.url);
});



module.exports = router;

