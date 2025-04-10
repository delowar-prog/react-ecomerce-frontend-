import React, { useContext, useState } from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdChecklist } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import List from './List';
import CreateCategory from './CreateCategory';
import CreateProduct from './CreateProduct';
import AuthContext from '@/context/AuthProvider';
import BrandList from './BrandList';
import CreateBrand from './CreateBrand';
import ProductDetails from './ProductDetails';



const Dashboard = () => {
    const [activeContent, setActiveContent] = useState('');
    const [updateProduct, setUpdateProduct] = useState({});
    const [updateCategory, setUpdateCategory] = useState({});
    const [updateBrand, setUpdateBrand] = useState({});
    const { auth } = useContext(AuthContext);

console.log(auth.user.name, 'auth');
    return (
        <div className="flex w-full">
            <aside className="w-1/6 border-r p-4 flex flex-col gap-3 h-screen">
                {
                    auth?.user?.name == "admin" ?
                        <>
                            <div
                                className={`cursor-pointer ${activeContent === 'category' ? "bg-purple-200" : ""} hover:bg-gray-200 py-2 border-2 flex text-center items-center justify-start gap-2`}
                                onClick={() => setActiveContent('category')}
                            >
                                <div className="px-5">
                                    <IoMdAddCircleOutline size={24} />
                                </div>
                                Category
                            </div>

                            <div
                                className={`cursor-pointer ${activeContent === 'product' ? "bg-purple-200" : ""} hover:bg-gray-200 py-2 border-2 flex text-center items-center justify-start gap-2`}
                                onClick={() => setActiveContent('product')}
                            >
                                <div className="px-5">
                                    <IoMdAddCircleOutline size={24} />
                                </div>
                                Products
                            </div>
                            <div
                                className={`cursor-pointer ${activeContent === 'brand' ? "bg-purple-200" : ""} hover:bg-gray-200 py-2 border-2 flex text-center items-center justify-start gap-2`}
                                onClick={() => setActiveContent('brand')}
                            >
                                <div className="px-5">
                                    <IoMdAddCircleOutline size={24} />
                                </div>
                                Brand
                            </div>

                            <div
                                className={`cursor-pointer ${activeContent === 'details' ? "bg-purple-200" : ""} hover:bg-gray-200 py-2 border-2 flex text-center items-center justify-start gap-2`}
                                onClick={() => setActiveContent('details')}
                            >
                                <div className="px-5">
                                    <IoMdAddCircleOutline size={24} />
                                </div>
                                Add Product Details
                            </div>
                        </>
                        :
                        ""
                }

                <div
                    className={`cursor-pointer ${activeContent === 'list-items' ? "bg-purple-200" : ""} hover:bg-gray-200 py-2 border-2 flex text-center items-center justify-start gap-2`}
                    onClick={() => setActiveContent('list-items')}
                >
                    <div className="px-5">
                        <MdChecklist size={24} />
                    </div>
                    List Items
                </div>

                <div
                    className={`cursor-pointer ${activeContent === 'orders' ? "bg-purple-200" : ""} hover:bg-gray-200 py-2 border-2 flex text-center items-center justify-start gap-2`}
                    onClick={() => setActiveContent('orders')}
                >
                    <div className="px-5">
                        <GoListOrdered size={24} />
                    </div>
                    Orders
                </div>
            </aside>

            <div className="flex-1 p-4 bg-white">
                {
                    auth?.user?.name == 'admin' ?
                        <>
                            {activeContent === 'category' && (
                                <div>
                                    <List
                                        url={'categories'}
                                        setActiveContent={setActiveContent}
                                        updateCategory={updateCategory}
                                        setUpdateCategory={setUpdateCategory}
                                    />
                                </div>
                            )}
                            {activeContent === 'product' && (
                                <div>
                                    <List
                                        url={'products'}
                                        setActiveContent={setActiveContent}
                                        updateProduct={updateProduct}
                                        setUpdateProduct={setUpdateProduct}

                                    />
                                </div>

                            )}
                            {activeContent === 'brand' && (
                                <div>
                                    <BrandList

                                        setActiveContent={setActiveContent}
                                        updateBrand={updateBrand}
                                        setUpdateBrand={setUpdateBrand}
                                    />
                                </div>

                            )}
                            {activeContent === 'create-category' && <CreateCategory setActiveContent={setActiveContent} updateCategory={updateCategory} setUpdateCategory={setUpdateCategory} />}
                            {activeContent === 'create-brand' && <CreateBrand setActiveContent={setActiveContent} />}
                            {activeContent === 'create-product' && <CreateProduct setActiveContent={setActiveContent} updateProduct={updateProduct} setUpdateProduct={setUpdateProduct} />}
                            {activeContent === 'details' && <ProductDetails setActiveContent={setActiveContent} updateBrand={updateBrand}
                                setUpdateBrand={setUpdateBrand} />}
                        </>
                        :
                        ""
                }
                {activeContent === 'list-items' && <div>List Items Content</div>}
                {activeContent === 'orders' && <div>Orders Content</div>}
                {!activeContent && <div>Select an option to view content</div>}
            </div>
        </div>
    );
};

export default Dashboard;
