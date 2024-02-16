// Importing necessary components and styles
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';

function App() {
  return (
    <div>
    <Router>
      
        {/* Rendering Navbar component */}
        <Navbar />
        
        {/* Defining routes for different components */}
        <Routes>

        <Route element={<PrivateComponent/>}>
          {/* Route for the home page */}
          <Route path='/' element={<h1>Product Listing Component</h1>} ></Route>
          
          {/* Route for adding a product */}
          <Route path='/add' element={<h1>Add Product Component</h1>}></Route>
          
          {/* Route for updating a product */}
          <Route path='/update' element={<h1>Update Product Component</h1>}></Route>
          
          {/* Route for logging out */}
          <Route path='/logout' element={<h1>Logout Component</h1>}></Route>
          
          {/* Route for user profile */}
          <Route path='/profile' element={<h1>Profile Component</h1>}></Route>

          </Route>
          {/* Route for Signup form */}
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>


        </Routes>
      
    </Router>
    <Footer/>
    </div>
  );
}

export default App;
