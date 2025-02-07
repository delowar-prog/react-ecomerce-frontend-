import apiCall from '@/api/axiosInstance';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const CreateCategory = ({ setActiveContent, updateCategory, setUpdateCategory }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
   
    useEffect(() => {
        if (updateCategory?.category) {
            reset({
                id: updateCategory?.category?.id || "",
                name: updateCategory?.category?.name || "",
            });
        }
    }, [updateCategory, reset]);

    const onSubmit = async (data) => {
        try {
            if (updateCategory?.category?.id) {
                await apiCall('post', `/categories/${updateCategory.category.id}`, data);
                toast.success('Category updated successfully!');
            } else {
                await apiCall('post', '/categories', data);
                toast.success('Category created successfully!');
            }

            setActiveContent('category');
            setUpdateCategory({});
        } catch (error) {
            console.error('Error creating category:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Creating category failed.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="name" className="block font-medium">
                    Category Name:
                </label>
                <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Category name is required' })}
                    className={`w-full border px-4 py-2 rounded ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                {updateCategory?.category?.id ? "Update Category" : "Create Category"}
            </button>
        </form>
    );
};

export default CreateCategory;
