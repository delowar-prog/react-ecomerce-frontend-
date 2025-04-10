import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";

const ProductCarousel = ({ filteredProducts, loading }) => {
  return (
    <div>
      <div className="w-full px-6 mx-auto">
        {loading ? (
          <div className="flex space-x-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-64 w-48" />
            ))}
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-full"
          >
            <CarouselContent>
              {filteredProducts.slice(0, 5).map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center justify-center space-y-4 p-6">
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}/${product.image}`}
                          alt={product.name}
                          className="object-cover h-48 w-full rounded-lg"
                        />
                        <div className="text-center space-y-1">
                          <h1 className="text-xl font-semibold text-gray-800">{product?.title}</h1>
                          <h1 className="text-sm text-gray-600">{product?.brand}</h1>
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between p-4 bg-gray-50 border-t">
                        <span className="text-lg font-bold text-gray-800">${product.price}</span>
                        <Link
                          to={`/product/${product.id}`}
                          className="px-4 py-2 text-sm font-semibold text-white bg-[#b437ea] rounded-lg hover:bg-[#995db3]"
                        >
                          See Details
                        </Link>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;
