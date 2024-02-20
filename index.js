//importing required modules
const express=require('express');
const User=require('./db/User');
const Product=require('./db/Product');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());

app.post('/register',async(req,resp)=>{
    let user=new User(req.body);
    let result= await user.save();
    result=result.toObject();
    delete result.password;
    resp.send(result);
});
app.post('/login',async(req,resp)=>{
    if (req.body.email && req.body.email)
    {
        let user=await User.findOne(req.body).select('-password');
        if (user)
        {
            resp.send(user);
        }
        else{
            resp.send('No user found');
        }
    
    }
    else{
        resp.send('No user found');
    }
}
);
app.post('/add-product',async(req,resp)=>{
    let product=new Product(req.body);
    let result= await product.save();
    resp.send(result);
})
app.get('/products',async(req,resp)=>{
    let products= await Product.find();
    if(products.length>0){
        resp.send(products);
    }
    else{
        resp.send("No Products Found");
    }
})
app.delete('/product/:id',async(req,res)=>{
    res.send(req.params.id);
    const result=await Product.deleteOne({_id:req.params.id});
});
app.get('/product/:id',async(req,res)=>{
    let result=await Product.findOne({_id:req.params.id});
    if (result){
       res.send(result);
    }
    else{
        console.log(result,"record not found");
    }

});
app.put('/product-update/:id',async(req,resp)=>{
    let result=await Product.updateOne({_id:req.params.id},{$set:req.body});
    
    resp.send(result);
});

app.listen(4500);