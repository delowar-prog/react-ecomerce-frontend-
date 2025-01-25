import React, { useState } from "react";

const CartInfo = () => {
  // Cart data
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Mobile Phone",
      image: "https://via.placeholder.com/100", // Replace with actual image path
      price: 17000,
      quantity: 1,
    },
  ]);

  // Update quantity
  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subTotal * 0.21; // 21% tax
  const grandTotal = subTotal + tax;

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
          {cart.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border border-gray-300 p-2">{item.name}</td>
              <td className="border border-gray-300 p-2">
                <img src={item.image} alt={item.name} className="w-16 h-16" />
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
                <button
                  onClick={() => updateQuantity(item.id, item.quantity)}
                  className="ml-2 bg-gray-800 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
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
            Continue Shopping
          </button>
          <button className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600">
            Checkout!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartInfo;
