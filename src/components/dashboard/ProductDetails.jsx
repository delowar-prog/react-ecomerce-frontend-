import apiCall from '@/api/axiosInstance';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ProductDetails = ({setActiveContent}) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        // For a single file
       
        if (data.img1 && data.img1[0]) {
            console.log('Appending image to formData:', data.img1[0]);
            formData.append('img1', data.img1[0]);
            formData.append('img2',data.img2[0]);
            formData.append('img3',data.img3[0]);
            formData.append('img4',data.img4[0]);
        }

        // Add other form fields to FormData
        Object.keys(data).forEach((key) => {
            if (key !== "image") formData.append(key, data[key]);
        });

        console.log(formData);
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
            // For files, `value` will log something like File {name: ..., size: ...}
        }

        try {

            // Make the API call
            const response = await apiCall('post', '/product-details', formData);

            // Notify success
            toast.success('Product Details created successfully!', {
                position: 'top-right',
            });

            setActiveContent('product');
        } catch (error) {
            console.error('Error creating product details:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Creating product detals failed.', {
                position: 'top-right',
            });
           
        }
    };

    const fetchedProducts = async () => {
        try {
            setLoading(true);
            const response = await apiCall('GET', `/products?all=true`);
            console.log(response);
            setProducts(response?.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchedProducts()
    },[])

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Product ID */}
                <div>
                <label htmlFor="product_id" className="block font-medium">Product:</label>
                <select
                    id="product_id"
                    {...register('product_id', { required: 'Product is required' })}
                    className={`w-full border px-4 py-2 rounded ${errors.product_id ? 'border-red-500' : ''}`}
                >
                    <option value="">Select a Product</option>
                    {products?.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.title}
                        </option>
                    ))}
                </select>
                {errors.product_id && (
                    <p className="text-red-500 text-sm mt-1">{errors.product_id.message}</p>
                )}
            </div>

                {/* Color */}
                <div>
                    <label className="block font-semibold">Color</label>
                    <input 
                        type="text" 
                        {...register("color", { required: "Color is required", maxLength: 255 })} 
                        className="w-full p-2 border rounded" 
                    />
                    {errors.color && <p className="text-red-500 text-sm">{errors.color.message}</p>}
                </div>

                {/* Size */}
                <div>
                    <label className="block font-semibold">Size</label>
                    <input 
                        type="text" 
                        {...register("size", { required: "Size is required", maxLength: 255 })} 
                        className="w-full p-2 border rounded" 
                    />
                    {errors.size && <p className="text-red-500 text-sm">{errors.size.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block font-semibold">Description</label>
                    <textarea 
                        {...register("description")} 
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Images */}
                {["img1", "img2", "img3", "img4"].map((img, index) => (
                    <div key={index}>
                        <label className="block font-semibold">
                            {img.toUpperCase()} {img === "img1" && <span className="text-red-500">*</span>}
                        </label>
                        <input 
                            type="file" 
                            {...register(img, {
                                required: img === "img1" ? "Image 1 is required" : false,
                                validate: (file) => 
                                    file && ["image/jpeg", "image/png", "image/jpg"].includes(file[0]?.type) || "Invalid file type"
                            })} 
                            className="w-full p-2 border rounded"
                        />
                        {errors[img] && <p className="text-red-500 text-sm">{errors[img].message}</p>}
                    </div>
                ))}

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ProductDetails;