import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import apiCall from '@/api/axiosInstance';
import { Skeleton } from '../ui/skeleton';

const HomeCarousel = () => {
  const [products, setProducts] = useState([]);
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  )
  const fetchedData = async () => {
    try {
      const response = await apiCall('get', '/products');
      console.log('Response:', response?.data?.data);
      setProducts(response?.data?.data);
    }

    catch (error) {
      console.error('Login Failed:', error.response?.data || error.message);
    }
  }
  console.log('Products:', products);

  useEffect(() => {
    fetchedData();
  }, [])

  return (
    <div className='flex items-center w-full mb-10 mt-5'>
      <div className="relative w-full  shadow-md rounded-md  flex items-center justify-between space-x-8">
        {/* Left Section */}
        <div className="relative w-1/2 flex flex-col items-center justify-center text-center px-6 py-0">
          {/* Background Decorative SVG */}
          <div className="absolute -top-24 -left-16 w-72 h-72 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute top-0 -right-16 w-72 h-72 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 rounded-full opacity-30 blur-3xl"></div>

          {/* Content */}
          <div className="relative flex flex-col justify-end z-10">
            <h1 className="text-5xl font-bold text-gray-800 mt-0">Welcome to Our Store</h1>
            <p className="text-lg text-gray-600 mt-4">
              Explore the best products at unbeatable prices.
            </p>
            <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
              Shop Now
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative w-1/2 flex items-center justify-center">
          <Carousel
            plugins={[plugin.current]} // Use the autoplay plugin
            className="w-full h-full overflow-x-hidden border-none" // Use `overflow-x-hidden` for proper scrolling behavior
            onMouseEnter={plugin.current.stop} // Stop autoplay on mouse hover
            onMouseLeave={plugin.current.reset} // Restart autoplay on mouse leave
          >
            <CarouselContent className="max-h-full">
              {products && products.length > 0 ? (
                products.slice(0, 4).map((product) => (
                  <CarouselItem className="max-h-[500px] w-full" key={product.id}>
                    <div className="p-1">
                      <Card className="shadow-none border-none outline-none">
                        <CardContent className="flex  w-full shadow-none items-center justify-center ">
                          <img
                            src={product.image} // Directly use the image URL
                            alt={product.name} // Use a meaningful alt

                            className=" w-full object-cover outline-none rounded-md h-[500px]" // Style the image
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                Array.from({ length: 4 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1 w-full">
                      <Card className="shadow-none border-none outline-none">
                        <CardContent className=" flex flex-col gap-3 w-full shadow-none items-center justify-center">
                          <Skeleton className="h-4 w-[400px]" />
                          <Skeleton className="h-4 w-[400px]" />
                          <Skeleton className="h-4 w-[400px]" />
                          <Skeleton className="h-4 w-[400px]" />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
            <CarouselPrevious /> {/* Previous button */}
            <CarouselNext /> {/* Next button */}
          </Carousel>
        </div>
      </div>

    </div>
  );
};

export default HomeCarousel;