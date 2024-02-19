const { default: mongoose } = require('mongoose');
const dbConnect =require('./config');

const productSchema=new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userid:String,
    company:String
});
module.exports=mongoose.model('products',productSchema);