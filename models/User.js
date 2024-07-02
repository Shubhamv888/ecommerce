const { ref } = require('joi');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    //username , password -> will be handled by passport - local - mongoose
    email : {
        type : String , 
        trim : true , 
        required : true
    },
    role : {
        type : String , 
        default : 'buyer'
    },
    gender : {
        type : String,
        trim : true ,
        required : true
    },

    wishlist : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product'
        }
    ],

    cart : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product'   
        }
    ]

});

// timestamps can be used to access the moment a document was created in the model
// it has 2 fields -> createdAt and updatedAt

userSchema.plugin(passportLocalMongoose);

// You're free to define your User how you like. Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.


let User = mongoose.model('User' , userSchema);

module.exports = User;