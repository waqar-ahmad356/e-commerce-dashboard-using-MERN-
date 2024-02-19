import React, { useEffect, useState } from 'react';

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

    

    return (
        <div className='product-list'>
            <h1>List of Products</h1>
            <ul>
                <li>Sr. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
            </ul>

            {
                products.map((item, index) => (
                    <ul key={index}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                    </ul>
                ))
            }

        </div>
    )
}

export default Products;

