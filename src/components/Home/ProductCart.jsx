import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import apiCall from "@/api/axiosInstance";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "../ui/skeleton";
import ProductCarousel from "./ProductCarousel";

const ProductCart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await apiCall("get", "/products");
      setProducts(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log('Products:', products);
  const filteredPhones = products.filter((product) => product.category_id === 1);
  const filteredLaptops = products.filter((product) => product.category_id === 2);
  //  console.log('Filtered Products:',filteredProducts.category);

  return (
    <div className="p-4 ">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-gray-800 my-5 text-center">Latest Phone in the town</h1>
        <ProductCarousel filteredProducts={filteredPhones} loading={loading} />
      </div>

      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-gray-800 my-5 text-center">Latest Laptop in the Town</h1>
        <ProductCarousel filteredProducts={filteredLaptops} loading={loading} />
      </div>

    </div>
  );
};

export default ProductCart;
