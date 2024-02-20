import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            let result = await fetch('http://localhost:4500/products');
            result = await result.json();
            setProducts(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const deleteProduct= async(_id)=>{
        
            let result =await fetch(`http://localhost:4500/product/${_id}`,{
                method:'Delete',
            }
           
            );
            result=await result.json();
            if (result)
            {
               getData();
            }

        
    }
    const searchhandle=async(e)=>{
       let key=e.target.value;
       if (key){
        let result=await fetch (`http://localhost:4500/search/${key}`);
       result=await result.json();

       if (result){
        setProducts(result);
       }
      

       }
       else
       {
        getData();
       }
       
    }

    

    return (
        <div className='product-list'>
            <h1>List of Products</h1>
            <input type='text' className='search-input-box' placeholder='search' onChange={searchhandle}></input>
            <ul>
                <li>Sr. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>

            {
              products.length>0?  products.map((item, index) => (
                    <ul key={index}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
                        <Link to={`/update/${item._id}`}><button>update</button></Link>
                        </li>
                    </ul>
                ))
                :<h1>No Result Found</h1>
            }

        </div>
    )
}

export default Products;

