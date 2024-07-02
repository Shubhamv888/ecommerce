// this product.js is diffn to Product.js where the model is defined.

// Generally Model containing files start with capital letters and other files with smaller letters

// Model files act as a js class and hence it is a good practice to capitalize their first letter

// A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.


const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const app = express();
const router = express.Router();
const {validateProduct , isLoggedIn , isSeller , isProductAuthor} = require('../middleware');



// Since Products.find() returns a promise, the entire callback function is a promise the awaits till the promise resolves.
// show all products and no arg. is passed when we need all the objects
router.get('/products' , async (req,res)=>{
    try{
        let products = await Product.find({}); //Good Practice to pass an empty object when find() function is used.
        res.render('products/index' , {products});
    }
    catch(e){
        res.render('error' , {err : e.message});
    }
})


// Create a form to add new products

router.get('/product/new' , isLoggedIn , isSeller, (req,res) => {
    try{
        
        res.render('products/new');
    }
    catch(e){
        res.render('error' , {err : e.message});
    }
})

router.post('/productS' ,  validateProduct , isLoggedIn , isSeller ,  async (req,res)=>{
    try{
        let {name, img , price, desc} = req.body;

        await Product.create({name, img , price, desc , author : req.user._id}); // create = new Product({name, img , price, desc}) then .save() ==> auto save()
        req.flash('success' , 'product added successfully');
        res.redirect('/products');
    }
    catch(e){
      
        res.render('error' , {err : e.message});
    }
})



// show a particular products info

router.get('/products/:id' , isLoggedIn ,  async (req,res) =>{
    try{
        let {id} = req.params;
        let foundProduct =  await Product.findById(id).populate('reviews'); //populate -> learn from mongoose docs
        
        res.render('products/show' , {foundProduct});
    }
    catch(e){
        res.render('error' , {err : e.message});
    }
})


//edit a particular page

router.get('/products/:id/edit', isLoggedIn , isSeller , async (req,res) =>{
    try{
        let {id} = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit' , {foundProduct});
    }
    catch(e){
        res.render('products/error' , {err : e.message});
    }
})

//edit route patch request

router.patch('/products/:id' , isLoggedIn , isSeller , isProductAuthor  , validateProduct , async (req,res)=>{
    try{  
        let {id} = req.params;
        let foundProduct = await Product.findById(id);
        let {name,img,price,desc} = req.body;

        await Product.findByIdAndUpdate(id , {name,img,price,desc});
        req.flash('success' , 'product edited successfully');
        res.redirect('/products');
    }
    catch(e){
        res.render('error' , {err : e.message});
    }
})

//delete a product

router.delete('/products/:id' , isLoggedIn  , isSeller , isProductAuthor , async (req,res) =>{
       try{ 
        let {id} = req.params;
        let foundProduct = await Product.findById(id);
        
        for(let ids of foundProduct.reviews){ // delete all the reviews before deleting the products 
            await Review.findByIdAndDelete(ids);
        }

        await Product.findByIdAndDelete(id);
        req.flash('success' , 'product deleted successfully');
        res.redirect('/products');
    }
    catch(e){
        res.render('error' , {err : e.message});
    }
})




module.exports = router;




