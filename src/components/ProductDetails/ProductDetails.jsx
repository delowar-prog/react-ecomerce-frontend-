import React, { useEffect, useState } from "react";
import Brinzal from "../../assets/test-img/100529102.jpg";
import { useParams } from "react-router-dom";
import apiCall from "@/api/axiosInstance";
export const ProductDetails = () => {
  const {id}=useParams();
  const [product, setProduct] = useState({});
 
   const fetchedData = async() =>{    
     try{
         const response = await apiCall('get', `/products/${id}`);
         setProduct(response?.data);
       }

       catch(error){
         console.error('Login Failed:', error.response?.data || error.message);
         }
       }
       console.log('Product:',product);
       
       useEffect(() => {
         fetchedData();
       }, [])

  const relatedProducts = [
    { id: 1, name: "POTATOS", price: 35, image: Brinzal },
    { id: 2, name: "RED POTATOS", price: 50, image: Brinzal },
    { id: 3, name: "WHITE BRINJAL", price: 60, image: Brinzal },
    { id: 4, name: "DATES", price: 250, image: Brinzal },
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Product Details Section */}
      <div className="flex gap-8">
        <div>
          <img
            src={product?.image}
            alt={product?.image}
            className="w-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{product?.title}</h2>
          <p className="text-gray-700 mt-2">{product?.description}</p>
          <p className="text-lg font-semibold mt-4">Price: ${product?.price}</p>
          <p className="text-gray-600">Category: {product?.category}</p>
          <p className="text-gray-600">Brand: {product?.brand}</p>
          <div className="flex items-center mt-4">
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="border px-2 py-1 w-16 mr-2"
            />
            <button className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <h3 className="text-xl font-semibold mt-12">RELATED PRODUCTS</h3>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 text-center shadow hover:shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 mx-auto object-cover"
            />
            <h4 className="text-lg font-bold mt-2">{product.name}</h4>
            <p className="text-gray-700">${product.price}</p>
            <button className="bg-purple-700 mt-2 px-4 py-1 rounded hover:bg-purple-800">
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};



