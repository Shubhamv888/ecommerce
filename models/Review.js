const mongoose = require('mongoose');


//name used in forms must be same as the name used in collections

const reviewSchema = new mongoose.Schema({
    rating : {
        type : Number,
        min : 0,
        max: 5
    }, 

    review:{
        type : String,
        trim : true,
        default : ""
    }
} , {timestamps : true});

// timestamps can be used to access the moment a document was created in the model
// it has 2 fields -> createdAt and updatedAt


let Review = mongoose.model('Review' , reviewSchema);

module.exports = Review;