import apiCall from '@/api/axiosInstance';
import Pagination from '@/common/Pagination';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

const BrandList = ({setActiveContent}) => {
    const [data, setData] = useState([]);
    const [meta, setMeta] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch data function
  const fetchedData = async (page=1) => {
      try {
          setLoading(true);
          const response = await apiCall('GET', `/brands?page=${currentPage}`);
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
          await apiCall('delete', `/brands/${id}`);
          // Update the state to remove the deleted item
            toast.success('Category created successfully!', {
                      position: 'top-right',
                  });
          setData((prevData) => prevData.filter((item) => item.id !== id));
      } catch (error) {
          console.error('Error deleting item:', error);
      }
  };
  

  useEffect(() => {
      fetchedData();
  }, [currentPage]);

const handlePageChange = (page) => {
  if (page >= 1 && page <= lastPage) {
      setCurrentPage(page); // Update the page
  }
};
    return (
        <div className="p-6 max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Brands</h1>
         <button onClick={()=>setActiveContent('create-brand')}
        className="ml-auto bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            >
        Create
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
                               
                                 
                                   <>
                                    <th className="px-4 py-2 text-gray-600 font-semibold">Name</th>
                                    <th className="px-4 py-2 text-gray-600 font-semibold">Action</th></>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-2">{index + 1}</td>
                             
                                        <>
                                        <td className="px-4 py-2">{item.brandName}</td>
                                        <td className="px-4 py-2"> <button onClick={()=>handleDelete(item?.id)}> <MdDeleteForever size={24}/> </button> </td>
                                        </>
                                    
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

export default BrandList;