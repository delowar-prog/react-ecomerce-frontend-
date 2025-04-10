import React, { useContext, useEffect, useState } from "react";
import Brinzal from "../../assets/test-img/100529102.jpg";
import { useParams } from "react-router-dom";
import apiCall from "@/api/axiosInstance";
import AuthContext from "@/context/AuthProvider";
import { useForm } from "react-hook-form";
export const ProductDetails = () => {
    const {auth, setCartCount, setCart} = useContext(AuthContext);
    
    const { register, handleSubmit, setValue } = useForm({
      defaultValues: {
        product_id: "",
        user_id: auth?.user?.id,
        quantity: 1,
        price: "",
      },
    });

    const onAddToCart = async (data) => {
      data.product_id = product.id;
      data.user_id = auth?.user?.id;
      data.price = product.price
      console.log(data, "hello");
       // Ensure data is logged here
      try {
        const response = await apiCall("POST", "/product-carts", data);
        setCartCount(prev=> prev+1)
        setCart((prev) => {
          const isProductInCart = prev.some((item) => item.product_id === data.product_id);
          if (isProductInCart) {
            return prev; // If product is already in the cart, don't add it again
          }
          return [
            ...prev,
            {
              id: response?.data?.id,
              title:response?.data?.title,
              product_id: data.product_id,
              user_id: data.user_id,
              quantity: data.quantity,
              price: data.price,
            },
          ];
        });
        alert("Product added to cart successfully!");
      } catch (error) {
        console.error("Error adding to cart:", error.response?.data || error.message);
        alert("Failed to add product to cart.");
      }
    };

  const {id}=useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [details, setDetails] = useState([]);
 
   const fetchedData = async() =>{    
     try{
         const response = await apiCall('get', `/products/${id}`);
         setProduct(response?.data);
         console.log(product);
       }

       catch(error){
         console.error('Login Failed:', error.response?.data || error.message);
         }
       }

      const fetchedProductDetails = async() =>{    
     try{
         const response = await apiCall('get', `/product-details/${id}`);
         setDetails(response?.data);
         console.log(product);
       }

       catch(error){
         console.error('Login Failed:', error.response?.data || error.message);
         }
       }

       const fetchedRelatedProducts = async () => {    
        try {
            const response = await apiCall('get', `/products?select=1`);
            const filteredProducts = response?.data?.data.filter(d => d.id !== id).slice(0, 4);
    
            setRelatedProduct(filteredProducts); // Ensure state is updated with an array
            console.log(relatedProduct, "related Product"); // Log the correct array
        } catch (error) {
            console.error('Fetching related products failed:', error.response?.data || error.message);
        }
    };
    
      
       
       useEffect(() => {
         fetchedData();
         fetchedProductDetails();
         fetchedRelatedProducts();
       }, [id])



  return (
    <div className="container mx-auto p-4">
      {/* Product Details Section */}
   <div className="flex">
  
      <form onSubmit={handleSubmit(onAddToCart)}>
      <div className="flex gap-8">
        <div>
          <img
            src={`${import.meta.env.VITE_BASE_URL}/${product.image}`}
            alt={product?.image}
            className="h-[300px] object-cover w-full rounded-lg"
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
              {...register('quantity')}
              min="1"
              defaultValue="1"
              className="border px-2 py-1 w-16 mr-2"
            />
            <button type="submit"  className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
            <input type="hidden" {...register("product_id")} />
            <input type="hidden" {...register("user_id")} />
            <input type="hidden" {...register("price")} />
           
        
        
          </form>
      {/* product details */}

      <div>
        {
        details &&  details.map(detail=>(
            <div>
              <img src={`${import.meta.env.VITE_BASE_URL}/${detail.image}`} alt="" />
              <p>{detail.description}</p>
            </div>
          ))
        }
      </div>

   </div>

      {/* Related Products Section */}
      <h3 className="text-xl font-semibold mt-12">RELATED PRODUCTS</h3>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {relatedProduct.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 text-center shadow hover:shadow-lg"
          >
            <img
              src={`${import.meta.env.VITE_BASE_URL}/${product.image}`}
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



