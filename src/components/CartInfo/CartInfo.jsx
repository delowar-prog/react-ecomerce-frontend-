import React, { useContext, useState, useEffect } from "react";
import AuthContext from "@/context/AuthProvider";
import apiCall from "@/api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartInfo = () => {
  const [currentCarts, setCurrentCarts] = useState([]);
  const { cart, setCartCount, setCart, orderedProducts, setOrderedProducts, setFinalTotal, finalTotal } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentCarts(cart); 
  }, [cart]);




  const removeItem = async (id) => {
    try {
      const response = await apiCall("DELETE", `/product-carts/${id}`);
      toast.success('Cart deleted successfully!');
      setCart((prev) => prev.filter((item) => item.id !== id));
      setCartCount((prev) => prev - 1);
      setCurrentCarts((prevCarts) => prevCarts.filter((item) => item.id !== id));
      
    } catch (error) {
      console.error("Failed to delete cart item:", error);
      toast.error("something error happened")
    }
  };

  const updateQuantity = (id, quantity) => {
    setCurrentCarts((prevCarts) =>
      prevCarts.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(quantity, 10) } : item
      )
    );
  };
  console.log(currentCarts,"current");
  console.log(cart,'cart')

  // Calculate totals
  const subTotal = currentCarts.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subTotal * currentCarts.reduce((total, item) => total + Number(item?.product?.discount) * item.quantity, 0) / 100;
  const taxInNum = Number(tax);
  const grandTotal = subTotal + taxInNum;
 
  // Handle checkout, set orderedProducts with cart details
  const handleCheckout = () => {
    setFinalTotal(grandTotal);
    const orderDetails = currentCarts.map((item) => {
      // Check if product exists before accessing its properties
      if (item.product) {
        return {
          name: item.product.title,
          price: item.price,
          image: item.product.image,
          quantity: item.quantity,
          total: item.price * item.quantity,
        };
      }

      return null; // Return null if product is undefined
    }).filter(item => item !== null);  // Remove any null values
  
   
  
    setOrderedProducts(orderDetails); // Set the ordered products to context state
  
    // Optionally, you can reset the cart after the order is placed
    setCart([]);
    setCartCount(0);
    
    // Navigate to checkout page after processing
    navigate('/checkout');
  };
  

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Product Name</th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Total Price</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentCarts.map((item,index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 p-2">{item.product?.title}</td>
              <td className="border border-gray-300 p-2">
                <img src={item?.product?.image} alt={item.product?.title} className="w-16 h-16" />
              </td>
              <td className="border border-gray-300 p-2">Tk. {item.price}</td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                  className="w-12 border border-gray-300 text-center"
                />
              </td>
              <td className="border border-gray-300 p-2">
                Tk. {item.price * item.quantity}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 font-bold"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <div className="flex justify-end">
          <div className="w-1/3">
            <p className="flex justify-between border-t py-2">
              <span>Sub Total:</span> <span>Tk. {subTotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between py-2">
              <span>Tax:</span> <span>Tk. {tax.toFixed(2)}</span>
            </p>
            <p className="flex justify-between font-bold py-2">
              <span>Grand Total:</span> <span>Tk. {grandTotal.toFixed(2)}</span>
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
            <Link to="/collections">Continue Shopping</Link>
          </button>
          <button
            className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
            onClick={handleCheckout} // Handle the checkout and save order details
          >
            CheckOut!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartInfo;
