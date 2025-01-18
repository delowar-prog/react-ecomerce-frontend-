import React, { useEffect, useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { AppSidebar } from './AppSidebar';
import apiCall from '@/api/axiosInstance';

const ProductCart = () => {
    const [products, setProducts] = useState([]);
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
        <SidebarProvider>
            <div className="flex">
                <AppSidebar />
                <div className="flex-1">
                    <SidebarTrigger />
                    <div className="p-4">
                        {
                            products.map(product =>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{product.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <img
                                            src={product.image}
                                            alt={product.image}
                                            className="w-full h-auto object-cover"
                                        />
                                    </CardContent>
                                    <CardFooter>
                                        <p>Price {product.price}</p>
                                    </CardFooter>
                                </Card>
                            )
                        }

                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default ProductCart;
