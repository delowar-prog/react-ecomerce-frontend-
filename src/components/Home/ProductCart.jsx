import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import apiCall from "@/api/axiosInstance";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";
import ProductCarousel from "./ProductCarousel";

const ProductCart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await apiCall("get", "/products");
      setProducts(response?.data?.data || []);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
    } finally {
      
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPhones = products.filter((product) => product.category_id === 1);
  const filteredLaptops = products.filter((product) => product.category_id === 2);

  return (
    <div className="p-4">
      {/* Phones Section */}
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-gray-800 my-5 text-center">
          Latest Phone in the Town
        </h1>
        {loading ? (
          <Carousel className="max-w-full overflow-x-hidden">
            <CarouselContent>
              {Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem key={index} className="">
                  <div className="p-1 max-w-full">
                    <Card className="shadow-none border-none outline-none">
                    <CardContent className=" flex flex-col gap-3 w-full shadow-none items-center justify-center">
                          <Skeleton className="h-4 w-[800px]" />
                            <Skeleton className="h-4 w-[800px]" />
                              <Skeleton className="h-4 w-[800px]" />
                                <Skeleton className="h-4 w-[800px]" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <ProductCarousel filteredProducts={filteredPhones} loading={loading} />
        )}
      </div>

      {/* Laptops Section */}
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-gray-800 my-5 text-center">
          Latest Laptop in the Town
        </h1>
        {loading ? (
          <Carousel className="max-w-full overflow-x-hidden">
            <CarouselContent>
              {Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1 w-full">
                    <Card className="shadow-none border-none outline-none">
                      <CardContent className=" flex flex-col gap-3 w-full shadow-none items-center justify-center">
                          <Skeleton className="h-4 w-[800px]" />
                            <Skeleton className="h-4 w-[800px]" />
                              <Skeleton className="h-4 w-[800px]" />
                                <Skeleton className="h-4 w-[800px]" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          
        ) : (
          <ProductCarousel filteredProducts={filteredLaptops} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default ProductCart;
