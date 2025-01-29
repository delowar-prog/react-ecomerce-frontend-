import React from 'react';
import CustomerForm from './CustomerForm';

const Shipping = () => {
    return (
        <div className='flex px-4 justify-between'>
            <div>
                <h1 className='text-xl font-bold py-4'>Customer Information</h1>
                <CustomerForm/>
            </div>
            <div>
                <h1>
                    Cart Totals
                </h1>
            </div>
        </div>
    );
};

export default Shipping;