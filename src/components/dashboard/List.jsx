import apiCall from '@/api/axiosInstance';
import Pagination from '@/common/Pagination';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import CreateProduct from './CreateProduct';

const List = ({ url, setActiveContent, updateProduct, setUpdateProduct,setUpdateCategory, updateCategory }) => {
    const [data, setData] = useState([]);
      const [meta, setMeta] = useState({});
      const [currentPage, setCurrentPage] = useState(1);
      const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);

    // Fetch data function
    const fetchedData = async (page=1) => {
        try {
            setLoading(true);
            const response = await apiCall('GET', `/${url}?page=${currentPage}`);
            setData(response?.data?.data);
            setMeta(response?.data?.meta || {});
            setCurrentPage(response?.data?.meta?.current_page || 1);
            setLastPage(response?.data?.meta?.last_page || 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await apiCall('delete', `/${url}/${id}`);
            // Update the state to remove the deleted item
              toast.success('Category created successfully!', {
                        position: 'top-right',
                    });
            setData((prevData) => prevData.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleUpdateProduct =(product)=>{
        setUpdateProduct((prev)=>({...prev,product}));
        console.log(updateProduct);
        setTimeout(()=>{
            setActiveContent('create-product');
        },100)
    }

    const handleUpdateCategory = (category)=>{
        setUpdateCategory((prev)=>({...prev,category}));
        setTimeout(()=>{
            setActiveContent('create-category');
        },100)
    }
    
   

    useEffect(() => {
        fetchedData();
    }, [url,currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= lastPage) {
        setCurrentPage(page); // Update the page
    }
};

    return (

        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold capitalize">{url}</h1>
                <button
    onClick={() => {
        if (url === 'categories') {
            setActiveContent('create-category');
        } else if (url === 'products') {
            setActiveContent('create-product');
        }
    }}
    className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
>    Create {url.slice(0, -1)}
                </button>
            </div>
            {loading ? (
                <div className="text-center py-6">
                    <p className="text-gray-500">Loading...</p>
                </div>
            ) : data.length ? (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
                    <table className="table-auto w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="px-4 py-2 text-gray-600 font-semibold">SL</th>
                                {url === 'products' ? (
                                    <>
                                        <th className="px-4 py-2 text-gray-600 font-semibold">Title</th>
                                        <th className="px-4 py-2 text-gray-600 font-semibold">Brand</th>
                                        <th className="px-4 py-2 text-gray-600 font-semibold">Category</th>
                                        <th className="px-4 py-2 text-gray-600 font-semibold">Image</th>
                                        <th className="px-4 py-2 text-gray-600 font-semibold">Action</th>
                                    </>
                                ) : (
                                   <>
                                    <th className="px-4 py-2 text-gray-600 font-semibold">Name</th>
                                    <th className="px-4 py-2 text-gray-600 font-semibold">Action</th></>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-2">{index + 1}</td>
                                    {url === 'products' ? (
                                        <>
                                            <td className="px-4 py-2">{item.title}</td>
                                            <td className="px-4 py-2">{item.brand}</td>
                                            <td className="px-4 py-2">{item.category}</td>
                                            <td className="px-4 py-2">
                                                <img
                                                    src={`${import.meta.env.VITE_BASE_URL}/${item.image}`}
                                                    alt={item.title}
                                                    className="w-16 h-16 rounded object-cover"
                                                />
                                            </td>
                                            <td className="px-4 py-2"> <div className='flex items-center'>
                                            <button onClick={()=>handleDelete(item?.id)}> <MdDeleteForever size={24}/> </button>
                                            <button className='black' onClick={()=>handleUpdateProduct(item)}> <FaEdit size={24}/> </button>
                                                </div> </td>
                                        </>
                                    ) : (
                                        <>
                                        <td className="px-4 py-2">{item.name}</td>
                                        <td className="px-4 py-2"><div>
                                            
                                      <div className="flex items-center">
                                      <button onClick={()=>handleDelete(item?.id)}> <MdDeleteForever size={24}/> </button>
                                      <button className='black' onClick={()=>handleUpdateCategory(item)}><FaEdit size={24}/> </button>
                                      </div>
                                            </div> </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex flex-col gap-5">
   
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          onPageChange={handlePageChange}
          meta={meta}
        />
    </div>
                </div>
            ) : (
                <div className="text-center py-6">
                    <p className="text-gray-500">No data available.</p>
                </div>
            )}
        </div>
    );
};

export default List;
