import AuthContext from "@/context/AuthProvider";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "../Element/Select";

const OrderForm = () => {
  const { orderedProducts, finalTotal } = useContext(AuthContext);
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const {register, handleSubmit,setValue,watch, formState: { errors }} = useForm({
    defaultValues: {
      cus_name: "",
      cus_country: "",
      cus_division: "",
      cus_district: "",
      cus_upazila: "",
      cus_union: "",
      cus_address: "",
      cus_phone: "",
      cus_email: "",
      ship_name: "",
      ship_country: "",
      ship_division: "",
      ship_district: "",
      ship_upazila: "",
      ship_union: "",
      ship_address: "",
      ship_phone: "",
    },
  });

  return (
    <div className="flex flex-col md:flex-row justify-between p-8 space-y-6 md:space-y-0 md:space-x-6 rounded-lg shadow-lg">
      {/* Left: Customer & Shipping Details */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-600 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Order Form</h2>
        <p className="text-gray-600 dark:text-gray-200 mb-6">Please fill out the form correctly.</p>

        <form className="space-y-4">
          {/* Customer Details */}
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Customer Details</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <input type="text" {...register('cus_name')} placeholder="Customer Name" className="w-full p-3 border rounded-md" />
          <input type="text" {...register('cus_address')} placeholder="Address" className="w-full p-3 border rounded-md" />
          <input type="text" {...register('cus_country')} placeholder="Country" className="w-full p-3 border rounded-md" />
          <Select {...register('cus_division')} param="divisions" />
          <Select {...register('cus_district')} param="districts" />
          <Select {...register('cus_upazila')} param="upazilas" />
          <Select {...register('cus_union')} param="unions" />
          <input type="text" placeholder="Post Code" className="w-full p-3 border rounded-md" />
          <input type="text" placeholder="Phone" className="w-full p-3 border rounded-md" />
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-md" />
          </div>

          {/* Shipping Details */}
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Shipping Details</h3>
          <label className="inline-flex items-center mb-2">
            <input type="checkbox" onChange={() => setSameAsBilling(!sameAsBilling)} />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Same as billing address</span>
          </label>
          {!sameAsBilling && (
            <>
              <input type="text" placeholder="Recipient Name" className="w-full p-3 border rounded-md" />
              <input type="text" placeholder="Shipping Address" className="w-full p-3 border rounded-md" />
              <input type="text" placeholder="Country" className="w-full p-3 border rounded-md" />
              <input type="text" placeholder="Division" className="w-full p-3 border rounded-md" />
              <input type="text" placeholder="District" className="w-full p-3 border rounded-md" />
              <input type="text" placeholder="Upazila" className="w-full p-3 border rounded-md" />
              <input type="text" placeholder="Post Code" className="w-full p-3 border rounded-md" />
              <input type="text" placeholder="Phone" className="w-full p-3 border rounded-md" />
            </>
          )}
          
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-blue-600">
            Submit Order
          </button>
        </form>
      </div>

      {/* Right: Product Information */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-600 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Product Information</h2>
        <table className="w-full text-sm text-left border">
          <thead className="bg-gray-200 dark:bg-gray-500">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Price</th>
            </tr>
          </thead>
          <tbody>
            {orderedProducts.map((product, index) => (
              <tr key={index}>
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border">{product.quantity}</td>
                <td className="p-2 border">{product.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-lg font-bold">Grand Total: {finalTotal}</p>
      </div>
    </div>
  );
};

export default OrderForm;
