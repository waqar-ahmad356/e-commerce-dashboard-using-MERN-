import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const[price,setPrice]=useState("");
    const[category,setCategory]=useState("");
    const [company,setCompany]=useState("");
    const [err,setErr]=useState(false);

    // Function to collect and Add product
  const AddProductHandle = async () => {

    if (!name || !price || !category || !company)
    {
        setErr(true);
        return false;
    }
  
    const userid=JSON.parse(localStorage.getItem('user'))._id;
    let result= await fetch('http://localhost:4500/add-product',{
      method:'post',
      body:JSON.stringify({name,price,category,company,userid}),
      headers:{
        'Content-Type':'application/json'
      },
    });
    result=await result.json();
    localStorage.setItem('product',JSON.stringify(result));
    
    if (result){
      navigate('/')
    }
  }
  return (
    <div className='signup'>
    <h1>Add Product</h1>
    <input type='text'  value={name} placeholder='name of product' className='inputbox' onChange={(e)=>setName(e.target.value)}></input>
   {err && !name &&<span className='invalid-input'>Enter invalid name</span>}
    <input type='text' value={price} placeholder='price of product' className='inputbox' onChange={(e)=>setPrice(e.target.value)}></input>
    {err && !price &&<span className='invalid-input'>Enter invalid price</span>}
    <input type='text' value={category} placeholder='category product' className='inputbox' onChange={(e)=>setCategory(e.target.value)}></input>
    {err && !category &&<span className='invalid-input'>Enter invalid category</span>}
    <input type='text' value={company} placeholder='company of product' className='inputbox' onChange={(e)=>setCompany(e.target.value)}></input>
    {err && !company &&<span className='invalid-input'>Enter invalid company</span>}
    <button type='submit' className='btn' onClick={AddProductHandle}>Add Product</button>
      
    </div>
  )
}

export default AddProduct
