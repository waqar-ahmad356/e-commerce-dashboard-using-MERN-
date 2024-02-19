import React, { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

// Functional component for Signup
const Signup = () => {
  // State variables for name, password, and email
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate=useNavigate();

  const useEffect=(()=>{
    const auth=localStorage.getItem('user');
    if(auth)
    {
      navigate('/');
    }
  },[]);

  // Function to collect and log user data
  const collectData = async () => {
    console.log(name, password, email);
    let result= await fetch('http://localhost:4500/register',{
      method:'post',
      body:JSON.stringify({name,email,password}),
      headers:{
        'Content-Type':'application/json'
      },
    });
    result=await result.json();
    localStorage.setItem('user',JSON.stringify(result));
    console.log(result)
    if (result){
      navigate('/')
    }
  }

  return (
    <div className='signup'>
      {/* Signup form */}
      <h1>Register</h1>
      <input 
        type='text' 
        className='inputbox' 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder='Enter user name'
      ></input>
      <input 
        type='text' 
        className='inputbox'  
        value={email} 
        onChange={(e) => setEmail(e.target.value)}  
        placeholder='Enter user email'
      ></input>
      <input 
        type='password' 
        className='inputbox'  
        value={password} 
        onChange={(e) => setPassword(e.target.value)}  
        placeholder='Enter user password'
      ></input>
      <button 
        className="btn" 
        onClick={collectData} 
        type='submit'
      >
        Sign up
      </button>
    </div>
  )
}

export default Signup;

