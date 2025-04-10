import React, { useContext, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import apiCall from "@/api/axiosInstance";
import { useForm } from "react-hook-form";
import AuthContext from "@/context/AuthProvider";
import { toast } from "react-toastify";


const CollectionCard = ({ product, userId }) => {
  const {auth, setCartCount, setCart} = useContext(AuthContext);
  
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      product_id: "",
      user_id: auth?.user?.id,
      quantity: 1,
      price: "",
      color:"white"
    },
  });

  // Pre-fill default values for the form
  useEffect(() => {
    if (product) {
      setValue("product_id", product?.id);
      setValue('user_id',auth?.user?.id)
      setValue("price", product?.price);
    }
  }, [product, setValue]);

  // Handle Add to Cart
  const onAddToCart = async (data) => {
    // data.color = "white";
    // data.size = "M";
    console.log(data, "hello"); // Ensure data is logged here
    try {
      const response = await apiCall("POST", "/product-carts", data);
      console.log(response);
      setCartCount(prev=> prev+1)
      setCart((prev) => {
        const isProductInCart = prev.some((item) => item.product_id === data.product_id);
        if (isProductInCart) {
          return prev; // If product is already in the cart, don't add it again
        }
        return [
          ...prev,
       response?.data
        ];
      });
      toast.success('Cart Added successfully');
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      alert("Failed to add product to cart.");
    }
  };


  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{product?.title}</CardTitle>
          <CardDescription className="text-sm text-gray-500">Card Description</CardDescription>
        </CardHeader>
        <CardContent>
        <Link to={`/product/${product?.id}`} >
        <img
            src={`${import.meta.env.VITE_BASE_URL}/${product.image}`}
            alt={product?.title}
            className="h-[300px] object-cover w-full rounded-lg"
          />
        </Link>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 bg-gray-50 border-t">
          {/* Product Price */}
          <span className="text-lg font-bold text-gray-800">${product?.price}</span>

          {/* Add to Cart Button */}
          <form onSubmit={handleSubmit(onAddToCart)}>
            
            <input type="hidden" {...register("product_id")} />
            <input type="hidden" {...register("user_id")} />
            <input type="hidden" {...register("price")} />
           
            <input
              type="number"
              {...register("quantity",)}
              defaultValue={1}
              className="hidden"
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#ED9FBF] rounded-lg hover:bg-[#DA5F92]"
            >
               Add to Cart
            </button>
          </form>
          {/* <form onSubmit={handleSubmit(onAddToCart)}>
            <button type="submit">btn</button>
          </form> */}

          <Link
            to={`/product/${product?.id}`}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#b437ea] rounded-lg hover:bg-[#995db3]"
          >
            See Details
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CollectionCard;
