const { default: mongoose } = require('mongoose');
const dbConnect =require('./config');

const userSchema=new mongoose.Schema({
    "name":String,
    "email":String,
    "password":Number
});
module.exports=mongoose.model('users',userSchema);