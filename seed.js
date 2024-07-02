const mongoose = require('mongoose');
const Product = require('./models/Product');



let arr = [

    {
        name :"nothing phone 2",
        img : "https://images.unsplash.com/photo-1711129250403-9a6d65d3b09f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price : 40000,
        desc : "nothing phone 2"
    },    
    {
        name : "nothing phone 2a",
        img : "https://images.unsplash.com/photo-1711239682372-fd545e32cb5b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price : 24000,
        desc : "nothing phone 2a"
    },
    {
        name : "nothing ear",
        img : "https://images.unsplash.com/photo-1677346414290-d337cbc682a6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price : 6500,
        desc : "nothing ear",
    }


]


// this insertMany() function is different fromt mongo shell command
// this function returns a promise

async function seedDB(){
    await Product.insertMany(arr);
    console.log(arr);
    console.log("DB seeded");
}


module.exports = seedDB;