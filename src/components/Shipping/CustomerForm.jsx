import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';

const CustomerForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) =>{
        console.log(data);
    }
    return (
        <div>
             <form onSubmit={handleSubmit(onSubmit)} className=" grid grid-cols-2 gap-3">
                <div>
                    <label htmlFor="cus_name" className="block text-sm font-medium">Customer Name</label>
                    <Input
                        id="cus_name"
                        type="text"
                        className="mt-1 p-2 border w-full rounded"
                        {...register('cus_name', { required: 'Customer name is required' })}
                    />
                    {errors.cus_name && <p className="text-red-500 text-sm">{errors.cus_name.message}</p>}
                </div>

                <div>
                    <label htmlFor="cus_address" className="block text-sm font-medium">Customer Address</label>
                    <Input
                        id="cus_address"
                        type="text"
                        className="mt-1 p-2 border w-full rounded"
                        {...register('cus_address', { required: 'Customer address is required' })}
                    />
                    {errors.cus_address && <p className="text-red-500 text-sm">{errors.cus_address.message}</p>}
                </div>

                <div>
                    <label htmlFor="cus_country" className="block text-sm font-medium">Country</label>
                    <Input
                        id="cus_country"
                        type="text"
                        className="mt-1 p-2 border w-full rounded"
                        {...register('cus_country', { required: 'Country is required' })}
                    />
                    {errors.cus_country && <p className="text-red-500 text-sm">{errors.cus_country.message}</p>}
                </div>

                <div>
                    <label htmlFor="cus_email" className="block text-sm font-medium">Email</label>
                    <Input
                        id="cus_email"
                        type="email"
                        className="mt-1 p-2 border w-full rounded"
                        {...register('cus_email', { 
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: 'Invalid email address'
                            }
                        })}
                    />
                    {errors.cus_email && <p className="text-red-500 text-sm">{errors.cus_email.message}</p>}
                </div>

                <div>
                    <label htmlFor="cus_phone" className="block text-sm font-medium">Phone</label>
                    <Input
                        id="cus_phone"
                        type="text"
                        className="mt-1 p-2 border w-full rounded"
                        {...register('cus_phone', { required: 'Phone number is required' })}
                    />
                    {errors.cus_phone && <p className="text-red-500 text-sm">{errors.cus_phone.message}</p>}
                </div>

                <div>
                    <label htmlFor="ship_name" className="block text-sm font-medium">Shipping Name</label>
                    <Input
                        id="ship_name"
                        type="text"
                        className="mt-1 p-2 border w-full rounded"
                        {...register('ship_name', { required: 'Shipping name is required' })}
                    />
                    {errors.ship_name && <p className="text-red-500 text-sm">{errors.ship_name.message}</p>}
                </div>

                <div className="mt-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CustomerForm;