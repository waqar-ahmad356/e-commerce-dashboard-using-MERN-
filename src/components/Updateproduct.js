import React, { useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Updateproduct = () => {
    
    const [name,setName]=useState("");
    const[price,setPrice]=useState("");
    const[category,setCategory]=useState("");
    const [company,setCompany]=useState("");
    
    const params=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        updateproductDetails();

    },[])

       // Function fill the fields for updation 
  const updateproductDetails = async () => {

        let result= await fetch(`http://localhost:4500/product/${params.id}`);
        result= await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);

}
const updateproduct=async()=>{
    let result= await fetch(`http://localhost:4500/product-update/${params.id}`,{
        method:'PUT',
        body:JSON.stringify({name,price,category,company}),
        headers:{
            'Content-Type':'application/json'
        }
    });
    result= await result.json();
    if (result){
        navigate('/');
    }

}
    

  return (
    <div className='signup'>
    <h1>Update Product</h1>
    <input type='text'  value={name} placeholder='name of product' className='inputbox' onChange={(e)=>setName(e.target.value)}></input>
  
    <input type='text' value={price} placeholder='price of product' className='inputbox' onChange={(e)=>setPrice(e.target.value)}></input>
 
    <input type='text' value={category} placeholder='category product' className='inputbox' onChange={(e)=>setCategory(e.target.value)}></input>
  
    <input type='text' value={company} placeholder='company of product' className='inputbox' onChange={(e)=>setCompany(e.target.value)}></input>
  
    <button type='submit' className='btn' onClick={updateproduct}>Update Product</button>
      
    </div>
  )
}

export default Updateproduct
