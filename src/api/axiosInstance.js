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
axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/refresh-token`, {refreshToken});
            // don't use axious instance that already configured for refresh token api call
            const newAccessToken = response.data.accessToken;
            localStorage.setItem('accessToken', newAccessToken);  //set new access token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest); //recall Api with new token
          } catch (error) {
            // Handle token refresh failure
            // mostly logout the user and re-authenticate by login again
          }
        }
      }
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
