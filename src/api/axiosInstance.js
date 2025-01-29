import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`, 
    timeout: 5000, 
    headers: {
        'Content-Type': 'application/json',
    },
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


const apiCall = async (method, url, data = null, params = null) => {
    try {
        const config = {
            method,
            url,
            data,
            params,
            headers: {
                'Content-Type': 'application/json', // Default Content-Type
            },
        };

        // 'multipart/form-data' if data is FormData
        if (data instanceof FormData) {
           config.headers['Content-Type'] = 'multipart/form-data'
        }

        const response = await axiosInstance(config);
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response || error.message);
        throw error.response ? error.response.data : error.message;
    }
};

export default apiCall;
