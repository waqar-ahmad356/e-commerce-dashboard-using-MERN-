//importing required modules
const express=require('express');
const User=require('./db/User');
const Product=require('./db/Product');
const cors=require('cors');
const Jwt=require('jsonwebtoken');
const app=express();
const jwtkey='e-comm';
app.use(cors());
app.use(express.json());

app.post('/register',async(req,resp)=>{
    let user=new User(req.body);
    let result= await user.save();
    result=result.toObject();
    delete result.password;
    if (result)
    {
        Jwt.sign({result},jwtkey,{expiresIn:"2h"},(err,token)=>{
            if (err)
            {
                console.log("Something went wrong please try again later")
            }
            else{
                resp.send({result,auth:token});
            }

        })
        
    }
});
app.post('/login',async(req,resp)=>{
    if (req.body.email && req.body.email)
    {
        let user=await User.findOne(req.body).select('-password');
        if (user)
        {
            Jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=>{
                if (err)
                {
                    console.log("Something went wrong please try again later")
                }
                else{
                    resp.send({user,auth:token});
                }

            })
            
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
app.get('/search/:key',async(req,res)=>{
    let result=await Product.find(
        {
            "$or":[
                {name:{$regex:req.params.key}},
                {price:{$regex:req.params.key}},
                {category:{$regex:req.params.key}},
                {company:{$regex:req.params.key}}
            ]
        }
    )
    res.send(result);
})

app.listen(4500);