import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { MdSearch } from "react-icons/md";
import apiCall from "@/api/axiosInstance";
import Searchbar from "../Searchbar/Searchbar";
import CollectionCard from "./CollectionCard";
import Pagination from "@/common/Pagination";

const Collections = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

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

  const fetchedProducts = async (page = 1) => {
    try {
      const response = await apiCall("get", `/products?page=${page}?select=${activeCategory}`);
      setProducts(response?.data?.data || []);
      setMeta(response?.data?.meta || {});
      setCurrentPage(response?.data?.meta?.current_page || 1);
      setLastPage(response?.data?.meta?.last_page || 1);
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchedProducts(currentPage);
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category.id);
    console.log("Selected Category:", category.name);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= lastPage) {
      setCurrentPage(page);
      fetchedProducts(page); 
    }
  };

  return (
    <div>
      <Searchbar />
      <div className="flex  gap-10 ">
        <div className="flex flex-col gap-3 py-4">
          <h1 className="text-center text-xl py-2 border rounded-md">Filter</h1>
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
    <div className="flex flex-col gap-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-4 ">
          {products.map((product) => (
            <CollectionCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          onPageChange={handlePageChange}
          meta={meta}
        />
    </div>
      </div>
    </div>
  );
};

export default Collections;
