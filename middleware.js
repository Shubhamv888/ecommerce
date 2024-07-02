const Product = require('./models/Product');
const {productSchema , reviewSchema} = require('./schema');


const validateProduct = (req,res,next)=>{
    let {name, img , price, desc}  = req.body;
    const {error} = productSchema.validate({name, img , price, desc});
    if(error){
        const msg = error.details.map((err)=>err.message).join(',');
        return res.render('error' , {err:msg});
    }

    next();
}

const validateReview = (req,res,next)=>{
    let {rating , review} = req.body;
    const {error} = reviewSchema.validate({rating , review});

    if(error){
        const msg = error.details.map((err)=>err.message).join(',');
        return res.render('error' , {err:msg});
    }

    next(); // here next calls the og function where the route request is handled

}


const isLoggedIn = (req,res,next) => {
    
    if(req.xhr && !req.isAuthenticated()){
        // return res.error({msg : 'login nigga!'})
        return res.status(401).send('unauthorised');

    }
    if(!req.isAuthenticated()){
        req.flash('error' , 'Please login first');
        return res.redirect('/login');
    }
    next();
}


const isSeller = (req,res,next) => {
    if(!req.user.role){
        req.flash('error' , 'Not enough power');
        return res.redirect('/products');
    }
    else if(req.user.role !== 'Seller'){
        req.flash('error' , 'Not enough power');
        return res.redirect('/products');
    }

    next();
}


const isProductAuthor = async (req,res,next)=>{
    let {id} = req.params;
    let product = await Product.findById(id);


    if(!product.author.equals(req.user._id)){
        req.flash('error' , 'You are not the owner of this product');
        return res.redirect(`/products/${id}`)
    }

    next();
}



module.exports = {validateProduct , validateReview , isLoggedIn , isSeller , isProductAuthor};