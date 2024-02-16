import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
import logo from '../images/Waqar.png';
import waqarlogo from '../images/Waqarlogo.png';

const Navbar = () => {
  const auth=localStorage.getItem('user');
  const navigate=useNavigate();
  const logout=()=>{
    console.log('apple');
    localStorage.clear();
    navigate('/');
  }
  return (
    <div>
    <img className='logo' src={logo} alt='logo'></img>
    { auth?
    <ul className='nav-bar'>
        <li><Link to='/'>Products</Link></li>
        <li><Link to='/add'> Add Products</Link></li>
        <li><Link to='/update'> update Products</Link></li>
        
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link to='/logout' onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
      
        
    </ul>
    :<ul className='nav-bar nav-right'>
    <li><Link to='/signup'>Signup</Link></li>
        <li><Link to='/login'> Login</Link></li>
    </ul>}
      
    </div>
  )
}

export default Navbar
