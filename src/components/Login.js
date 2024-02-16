import React, { useState,useEffect } from 'react'

import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const useEffect=(()=>{
        const auth=localStorage.getItem('user');
        if(auth)
        {
          navigate('/');
        }
      },[]);

    const collectData=async()=>{
        console.log({email,password});
        let result=await fetch('http://localhost:4500/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        result=await result.json();
        console.log(result);
        if (result.name){
            localStorage.setItem('user',JSON.stringify(result));
            navigate('/');


        }
        else{
            alert('please eneter correct user and password');
        }
    }
    return (
        <div className='signup'>
          {/* Signup form */}
          <h1>Login</h1>
       
          <input 
            type='text' 
            className='inputbox' 
            onChange={(e)=>setEmail(e.target.value)} 
            value={email}
          
            placeholder='Enter user email'
          ></input>
          <input 
            type='password' 
            className='inputbox' 
            onChange={(e)=>setPassword(e.target.value)}
            value={password} 
           
            placeholder='Enter user password'
          ></input>
          <button 
            className="btn" 
            onClick={collectData}
            
            type='submit'
          >
            Sign In
          </button>
        </div>
      )
}

export default Login
