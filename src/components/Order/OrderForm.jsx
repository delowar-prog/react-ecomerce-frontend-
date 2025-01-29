import React from "react";

const OrderForm = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between p-8 space-y-6 md:space-y-0 md:space-x-6 rounded-lg shadow-lg">
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-600 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Order Form</h2>
        <p className="text-gray-600 dark:text-gray-200 mb-6">Please fill out the form correctly.</p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 dark:text-gray-200 mb-1">
              Name (Who Receives the Product)
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 dark:text-gray-200 mb-1">
              Shipping Address
            </label>
            <textarea
              rows="3"
              placeholder="Enter your address"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 dark:text-gray-200 mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              placeholder="Enter your mobile number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 dark:text-gray-200 mb-1">
              City
            </label>
            <input
              type="text"
              placeholder="Enter your city"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 dark:bg-gray-500 text-white font-bold py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Right: Product Information */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-600 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Product Information
        </h2>

        <table className="w-full text-sm text-left text-gray-600 dark:text-gray-200 border border-gray-200">
          <thead className="bg-gray-200 dark:bg-gray-500">
            <tr>
              <th className="p-2 border border-gray-300">#</th>
              <th className="p-2 border border-gray-300">Pro ID</th>
              <th className="p-2 border border-gray-300">Image</th>
              <th className="p-2 border border-gray-300">Product Name</th>
              <th className="p-2 border border-gray-300">Qty</th>
              <th className="p-2 border border-gray-300">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-gray-300">1</td>
              <td className="p-2 border border-gray-300">40a719cc</td>
              <td className="p-2 border border-gray-300">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Mobile Phone"
                  className="w-10 h-10 object-cover rounded"
                />
              </td>
              <td className="p-2 border border-gray-300">Mobile Phone</td>
              <td className="p-2 border border-gray-300">1</td>
              <td className="p-2 border border-gray-300">Tk. 17,000</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-6 text-gray-800 dark:text-gray-200">
          <p className="flex justify-between border-t dark:border-gray-200 py-2">
            <span>Sub Total:</span> <span>Tk. 17,000</span>
          </p>
          <p className="flex justify-between py-2">
            <span>Tax:</span> <span>Tk. 3,570</span>
          </p>
          <p className="flex justify-between font-bold py-2">
            <span>Grand Total:</span> <span>Tk. 20,570</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
