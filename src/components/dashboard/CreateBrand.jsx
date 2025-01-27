import apiCall from '@/api/axiosInstance';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const CreateBrand = ({setActiveContent}) => {
    const {register, handleSubmit, setError,formState:{errors}} = useForm({
        defaultValues:{
            
        }
    })
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('brandName', data.brandName);
            formData.append('brandimg', data.brandimg[0]); // File input (first file)
    
            const response = await apiCall('post', '/brands', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            toast.success('Brand created successfully!', {
                position: 'top-right',
            });
    
            setActiveContent('Brand');
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Creation failed');
        }
    };
    

    return (
        <div>
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="name" className="block font-medium">
                    Brand Name:
                </label>
                <input
                    type="text"
                    id="brandName"
                    {...register('brandName', {
                        required: 'Brand name is required', // Validation rule
                    })}
                    className={`w-full border px-4 py-2 rounded ${
                        errors.name ? 'border-red-500' : ''
                    }`}
                />
                {errors.brandName && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.brandName.message}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="name" className="block font-medium">
                    Brand Image:
                </label>
                <input
                    type="file"
                    id="brandimg"
                    {...register('brandimg', {
                        required: 'Brand Image is required', // Validation rule
                    })}
                    className={`w-full border px-4 py-2 rounded ${
                        errors.name ? 'border-red-500' : ''
                    }`}
                />
                {errors.brandimg && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.brandimg.message}
                    </p>
                )}
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Create Brand
            </button>
        </form>
        </div>
    );
};

export default CreateBrand;