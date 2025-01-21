import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { MdSearch } from "react-icons/md";
import apiCall from "@/api/axiosInstance";
import Searchbar from "../Searchbar/Searchbar";

const Collections = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null); // Track the active category

  const fetchData = async () => {
    try {
      const response = await apiCall("get", "/categories");
      setCategories(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category.id); // Set the active category
    console.log("Selected Category:", category.name);
    // You can perform further actions here, like filtering items or making API calls
  };

  return (
    <div>
      <Searchbar/>
      <div className="flex justify-between">
        <div>
          <h1 className="text-center text-xl py-4">Filter</h1>
          <div className="border p-5 flex flex-col items-center">
            <h1 className="text-lg border-b py-2">Categories</h1>
            <ul className="mt-4">
              {categories.map((category) => (
                <li
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className={`py-2 px-4 my-1 rounded-md cursor-pointer ${
                    activeCategory === category.id
                      ? "bg-gray-500 text-white"
                      : "hover:bg-gray-400"
                  }`}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>Items</div>
      </div>
    </div>
  );
};

export default Collections;
