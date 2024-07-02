// require all the pre-requisites
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const ratingRoutes = require('./routes/review');
const productRoutes = require('./routes/product');
const productApi= require('./routes/api/productApi');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');
const dotenv = require('dotenv').config();

// whenever we use a mongodb operation using mongoose , it always returns a promise
// it is always an async function because searching/doing any operation in a db takes time

app.get('/' , (req,res) => {
    res.redirect('/products');
})


//defining the express session object
// Date.now() gives the current time in ms and we define the expiry and the maxAge of the session in milliseconds only
let configSession = {
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false, 
    cookie: {
        httpOnly : true,
        expires : Date.now() + 7*24*60*60*1000 ,  // expires -> it defines the amount of time a session lasts
        maxAge : 7*24*60*60*1000 // maxAge defines the max time of the session , 7*24*60*60*1000 => this is 7 days in ms
        // expires and maxAge must always be the same and the session gets terminated when time = min(expires , maxAge)
    }
}


//connect to the db via mongoose
// let url = 'mongodb+srv://shubhamv888:shubhamv%40123456789@ecommerce.uq7c52c.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce';

mongoose.connect(process.env.URL)
.then(()=>{console.log("Mongoose Connected")})
.catch((err)=>{console.log("Error : " , err)})

// set the primitives for the views and the public folder according to the MVC architecture
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));
app.use(express.static(path.join(__dirname , 'public')));
// method-override
app.use(methodOverride('_method'));


// to use the form data, use an encoder
app.use(express.urlencoded({extended : true}));


// always mount the session and connect flash middleware before running any route files because the routes are depenedent on a session and before creating a session we cannot make requests on routes
app.use(session(configSession));
app.use(flash()); // always after the express-session



// always intialize serialize and deserialize after the session has been initialized because these static functions work 
// when the session is running and the once the user log outs a new session is started.
app.use(passport.initialize());
app.use(passport.session());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


passport.use(new LocalStrategy(User.authenticate()));

// whenever we perform seeding , only run the seedDB function once and then comment it 
// else nodemon will refresh the server every time a change is made and the data will be inserted in the db multiple times

app.use((req,res,next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// seedDB();

app.use(productRoutes); // check for every request made to the products
app.use(ratingRoutes);
app.use(authRoutes);
app.use(productApi);
app.use(cartRoutes);




// use express-session and connect-flash
// always use flash after express session because flash is dependent in flash and the code flows from top to bottom




//listen to the server on port
// const PORT = 8080;
app.listen(process.env.PORT , ()=>{
    console.log(`Connected to Port : ${process.env.PORT}`);
})