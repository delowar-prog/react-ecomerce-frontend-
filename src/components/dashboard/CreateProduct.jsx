import apiCall from '@/api/axiosInstance';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProduct = ({ setActiveContent,updateProduct }) => {
    const { register, handleSubmit, formState: { errors }, reset,setValue } = useForm({
        defaultValues: {
          id: updateProduct?.product?.id || "",
          title: updateProduct?.title || "",
          short_des: updateProduct?.product?.short_des || "",
          price: updateProduct?.product?.price || "",
          discount: updateProduct?.product?.discount || "",
          discount_price: updateProduct?.product?.discount_price || "",
          image: updateProduct?.product?.image || "",
          stock: updateProduct?.product?.stock || "",
          star: updateProduct?.product?.star || "",
          remarks: updateProduct?.product?.remarks || "",
          category_id: updateProduct?.product?.category_id || "",
          brand_id: updateProduct?.product?.brand_id || "",
        },
      });
      if(updateProduct?.product){
        setValue('category_id',updateProduct?.product.category_id)
        setValue('brand_id',updateProduct?.product.brand_id)
        // setValue('image',URL.createObjectURL(updateProduct.product.image))
      }
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (updateProduct?.product) {
          // Reset the form with updated product details
          reset({
            id: updateProduct?.product?.id || "",
            title: updateProduct?.product?.title || "",
            short_des: updateProduct?.product?.short_des || "",
            price: updateProduct?.product?.price || "",
            discount: updateProduct?.product?.discount || "",
            discount_price: updateProduct?.product?.discount_price || "",
            image: updateProduct?.product?.image || "",
            stock: updateProduct?.product?.stock || "",
            star: updateProduct?.product?.star || "",
            remarks: updateProduct?.product?.remarks || "",
            category_id: updateProduct?.product?.category_id || "",
            brand_id: updateProduct?.product?.brand_id || "",
          });
        }
      }, [updateProduct, reset]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        // For a single file
       
        if (data.image && data.image[0]) {
            console.log('Appending image to formData:', data.image[0]);
            formData.append('image', data.image[0]);
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
           if(updateProduct){
            const response = await apiCall('post', `/products/${updateProduct?.product?.id}`, formData);

            // Notify success
            toast.success('Product updated successfully!', {
                position: 'top-right',
            });

            setActiveContent('product');
           }
           else{
            const response = await apiCall('post', '/products', formData);

            // Notify success
            toast.success('Product created successfully!', {
                position: 'top-right',
            });

            setActiveContent('product');
           }
        } catch (error) {
            console.error('Error creating product:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Creating product failed.', {
                position: 'top-right',
            });
            
        }
    };

 

    const fetchedCategories = async () => {
        try {
            setLoading(true);
            const response = await apiCall('GET', `/categories?all=true`);
            setCategories(response?.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const fetchedBrands = async () => {
        try {
            setLoading(true);
            const response = await apiCall('GET', `/brands?all=true`);
            setBrands(response?.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchedCategories();
        fetchedBrands();
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data' className="space-y-4 bg-white p-6 rounded shadow-md">
            {/* Title */}
            <div>
                <label htmlFor="title" className="block font-medium">Title:</label>
                <input
                    type="text"
                    id="title"
                    name='title'
                    defaultValue={updateProduct?.product?.title}
                    {...register('title', { required: 'Title is required', maxLength: 255 })}
                    className={`w-full border px-4 py-2 rounded ${errors.title ? 'border-red-500' : ''}`}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* Short Description */}
            <div>
                <label htmlFor="short_des" className="block font-medium">Short Description:</label>
                <textarea
                    id="short_des"
                    {...register('short_des', { maxLength: 500 })}
                    className="w-full border px-4 py-2 rounded"
                ></textarea>
                {errors.short_des && (
                    <p className="text-red-500 text-sm mt-1">{errors.short_des.message}</p>
                )}
            </div>

            {/* Price */}
            <div>
                <label htmlFor="price" className="block font-medium">Price:</label>
                <input
                    type="number"

                    id="price"
                    {...register('price', { required: 'Price is required', })}
                    className={`w-full border px-4 py-2 rounded ${errors.price ? 'border-red-500' : ''}`}
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>

            {/* Discount */}
            <div>
                <label htmlFor="discount" className="block font-medium">Discount (%):</label>
                <input
                    type="number"

                    id="discount"
                    {...register('discount', { min: 0, max: 100, })}
                    className={`w-full border px-4 py-2 rounded ${errors.discount ? 'border-red-500' : ''}`}
                />
                {errors.discount && (
                    <p className="text-red-500 text-sm mt-1">{errors.discount.message}</p>
                )}
            </div>

            {/* Discount Price */}
            <div>
                <label htmlFor="discount_price" className="block font-medium">Discount Price:</label>
                <input
                    type="number"

                    id="discount_price"
                    {...register('discount_price',)}
                    className="w-full border px-4 py-2 rounded"
                />
            </div>

            {/* Image */}
            <div>
                <label htmlFor="image" className="block font-medium">Image:</label>

                <input
              {...register("image", { required: "image is required" })}
              className={`input input-sm ${
                errors.image ? "border-red-500" : "border-gray-200"
              }`}
              type="file"
              name="image"
              accept="image/*"
              placeholder="Upload image"
            />


            </div>

            {/* Stock */}
            <div>
                <label htmlFor="stock" className="block font-medium">Stock:</label>
                <input
                    type="number"
                    id="stock"
                    {...register('stock', { required: 'Stock is required', min: 0 })}
                    className={`w-full border px-4 py-2 rounded ${errors.stock ? 'border-red-500' : ''}`}
                />
                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
            </div>

            {/* Star */}
            <div>
                <label htmlFor="star" className="block font-medium">Star Rating:</label>
                <input
                    type="number"
                    step="0.1"
                    id="star"
                    {...register('star', { min: 0, max: 5 })}
                    className={`w-full border px-4 py-2 rounded ${errors.star ? 'border-red-500' : ''}`}
                />
                {errors.star && <p className="text-red-500 text-sm mt-1">{errors.star.message}</p>}
            </div>

            {/* Remarks */}
            <div>
                <label htmlFor="remarks" className="block font-medium">Remarks:</label>
                <textarea
                    id="remarks"
                    {...register('remarks')}
                    className="w-full border px-4 py-2 rounded"
                ></textarea>
            </div>

            {/* Category */}
            <div>
                <label htmlFor="category_id" className="block font-medium">Category:</label>
                <select
                    id="category_id"
                    
                    {...register('category_id', { required: 'Category is required' })}
                    className={`w-full border px-4 py-2 rounded ${errors.category_id ? 'border-red-500' : ''}`}
                >
                    <option value="">Select a Category</option>
                    {categories?.map((category) => (
                        <option key={category.id}  value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.category_id && (
                    <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>
                )}
            </div>

            {/* Brand */}
            <div>
                <label htmlFor="brand_id" className="block font-medium">Brand:</label>
                <select
                    id="brand_id"
                    {...register('brand_id', { required: 'Brand is required' })}
                    className={`w-full border px-4 py-2 rounded  ${errors.brand_id ? 'border-red-500' : ''}`}
                >
                    <option value="">Select a Brand</option>
                    {brands?.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                            {brand.brandName}
                        </option>
                    ))}
                </select>
                {errors.brand_id && (
                    <p className="text-red-500 text-sm mt-1">{errors.brand_id.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                {
                    updateProduct? "Update Product" : "Create Product" 
                    }
            </button>
        </form>
    );
};

export default CreateProduct;
