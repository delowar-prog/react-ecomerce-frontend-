import apiCall from '@/api/axiosInstance';
import React from 'react';
import { set, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const CreateCategory = ({setActiveContent}) => {
   
    const {register, handleSubmit, setError,formState:{errors}} = useForm({
        defaultValues:{
            name:""
        }
    })

    const onSubmit = async(data) => {
        try{
          const response = await apiCall('post','/categories',data);
          toast.success('Category created successfully!', {
            position: 'top-right',
        });
          
          setActiveContent('category')
        }
        catch(error){
          console.error('', error.response?.data || error.message);
          alert(error.response?.data?.message || 'creating failed');
          }
          
          console.log(data);
      }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="name" className="block font-medium">
                    Category Name:
                </label>
                <input
                    type="text"
                    id="name"
                    {...register('name', {
                        required: 'Category name is required', // Validation rule
                    })}
                    className={`w-full border px-4 py-2 rounded ${
                        errors.name ? 'border-red-500' : ''
                    }`}
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                    </p>
                )}
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Create Category
            </button>
        </form>
    );
};

export default CreateCategory;
