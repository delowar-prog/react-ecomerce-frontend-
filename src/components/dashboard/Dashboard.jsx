import React, { useState } from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdChecklist } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";

const Dashboard = () => {
    const [activeContent, setActiveContent] = useState(''); // State to manage active content

    return (
        <div className="flex w-full">
            <aside className="w-1/6 border-r p-4 flex flex-col gap-3 h-screen">
                <div 
                    className={`cursor-pointer ${activeContent=='add-items'?"bg-purple-200":""} hover:bg-gray-200 py-2 border-2 flex text-center items-center justify-start gap-2`} 
                    onClick={() => setActiveContent('add-items')}
                >
                      <div className='px-5'>
                    <IoMdAddCircleOutline size={24}/>
                    </div>
                    Add Items
                  
                </div>
                <div 
                    className={`cursor-pointer ${activeContent=='list-items'?"bg-purple-200":""} hover:bg-gray-200 py-2 border-2 flex text-center items-center justify-start gap-2`}  
                    onClick={() => setActiveContent('list-items')}
                >
                       <div className='px-5'>
                    <MdChecklist size={24}/>
                    </div>
                    List Items
                </div>
                <div 
                    className={`cursor-pointer ${activeContent=='orders'?"bg-purple-200":""} hover:bg-gray-200 py-2 border-2 flex text-center items-center justify-start gap-2`}  
                    onClick={() => setActiveContent('orders')}
                >
                       <div className='px-5'>
                    <GoListOrdered size={24}/>
                    </div>
                    Orders
                </div>
            </aside>
            <div className="flex-1 p-4 bg-white">
                {activeContent === 'add-items' && <div>Add Items Content</div>}
                {activeContent === 'list-items' && <div>List Items Content</div>}
                {activeContent === 'orders' && <div>Orders Content</div>}
                {!activeContent && <div>Select an option to view content</div>}
            </div>
        </div>
    );
};

export default Dashboard;
