//Always start the model filename with a capital letter

// Generally Model containing files start with capital letters and other files with smaller letters

// Model files act as a js class and hence it is a good practice to capitalize their first letter
const express = require('express');
const mongoose = require('mongoose');
const app = express();


    // MODEL IN JS(MONGOOSE) = COLLECTION IN MONGO DB

    const productsSchema = new mongoose.Schema({
        //Always be as specific as possible when creating a model

        //Attributes of a Product are : 
        // Name , Img , Price , Description,




        name : {
            // type => defines the data type of this field
            type : String, 

            // trim => it defines whether to remove extra whitespaces from the name or not
            trim : true,

            // required => it defines whether this field is compulsory or not
            required : true
            
        },

        img : {
            // here type is string because if the image doesn't load we can show the string as default
            type : String,
            
            // this trim is always used for the string above
            trim :true

        },

        price : {
            type : Number,

            // it sets the minimum value of this field and any value below it will be replaced with this as default
            min : 0,

            required:true
        },

        desc:{
            type : String,
            trim : true
        },

        // use an array of references to another model/collection 
        // here we only hold the reference to the comments using a products object id
        reviews : [
                {
                type : mongoose.Schema.Types.ObjectId , 
                // type = mongoose check all schemas and find the field type object id and return it
                // since their can be multiple schemas, we have to refer mongoose to the correct schema
                // ref does this job for us
                ref : 'Review'
            }
        ],

        author : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
        


    });


// A MODEL/COLLECTION == Is represented by ==> JS CLASS == Class gives us ==> OBJECTS\DOCUMENT




//Create the collection 
// let collection_name = mongoose.model('model_name' , model_schema)


//Name of the model must be singular and the name must start with a capital letter
let Product = mongoose.model('Product' , productsSchema);



//export the module to use in other files

module.exports = Product;































