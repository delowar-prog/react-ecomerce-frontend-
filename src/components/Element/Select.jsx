import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import apiCall from '@/api/axiosInstance';

const Select = ({ param }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { register } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiCall('get', `/${param}?all=true`);
                setData(response?.data || []);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [param]);
  console.log(data, "data");
  console.log('param:', param);
    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <select {...register(param)} className="w-full p-3 border rounded-md">
                <option value="">Select {param}</option>
                {data.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
            {error && <div className="text-red-500">Error: {error.message}</div>}
        </div>
    );
};

export default Select;
