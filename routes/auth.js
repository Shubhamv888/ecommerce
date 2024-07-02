const express = require('express');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router();

router.get('/register' , (req,res)=>{
    res.render('auth/signup');  
})

router.post('/register' , async (req,res) =>{
    try{
        let {username , email , gender , password , role} = req.body;
        let user = new User({username , email , gender, role});
        let newUser = await User.register( user , password);
        res.redirect('/login');
    }
    catch(err){
        res.render('error' , {err : err.message});
    }
})


router.get('/login' , (req,res)=>{
    res.render('auth/login');
})  


router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res)=> {
    req.flash('success' , `Welcome back ${req.user.username}`);
    res.redirect('/products');
});


router.get('/logout' , (req,res)=>{
    req.logout(()=>{
        req.flash('success' , 'Logged out successfully')
        res.redirect('/login');
    });
})



module.exports = router;


