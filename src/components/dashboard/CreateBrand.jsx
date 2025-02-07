import apiCall from '@/api/axiosInstance';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const CreateBrand = ({setActiveContent,updateBrand}) => {
    const {register, handleSubmit, setError,formState:{errors},reset} = useForm({
        defaultValues:{
            
        }
    })
    console.log(updateBrand);
      useEffect(() => {
            if (updateBrand?.brand) {
              // Reset the form with updated brand details
              reset({
                id: updateBrand?.brand?.id || "",
                brandName: updateBrand?.brand?.brandName || "",
                brandImage: updateBrand?.brand?.brandimg || "",

              });
            }
          }, [updateBrand, reset]);
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("brandName", data.brandName);
    
        // Append file only if it exists
        if (data.brandimg && data.brandimg.length > 0) {
            formData.append("brandimg", data.brandimg[0]);
        } else {
            console.error('No file selected for brandimg');
        }
    
        console.log(formData.brandimg);
        // Log all FormData entries for debugging
      
    
        try {

            // Make the API call
           if(updateBrand){
            const response = await apiCall('post', `/brands/${updateBrand?.brand?.id}`, formData);

            // Notify success
            toast.success('Brand updated successfully!', {
                position: 'top-right',
            });

            setActiveContent('brand');
           }
           else{
            const response = await apiCall('post', '/brands', formData);

            // Notify success
            toast.success('Brand created successfully!', {
                position: 'top-right',
            });

            setActiveContent('brand');
           }
        } catch (error) {
            console.error('Error creating brand:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Creating brand failed.', {
                position: 'top-right',
            });
            
        }
    };
    
    

    return (
        <div>
             <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
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
                {
                    updateBrand? "Create Brand" : "Update Brand"
                }
            </button>
        </form>
        </div>
    );
};

export default CreateBrand;