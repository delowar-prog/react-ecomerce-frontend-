import apiCall from '@/api/axiosInstance';
import React, { createContext, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading,setLoading] = useState(true)
    const [showIn, setShowIn] = useState(false);
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [orderedProducts, setOrderedProducts]= useState([])
    const [finalTotal, setFinalTotal] = useState(0)

    
    const login = (user, token) => {
        setAuth({ user, token});

        localStorage.setItem('user', JSON.stringify(user)); 
        localStorage.setItem('access_token', token.access_token); 
        localStorage.setItem('refresh_token',token.refresh_token);
    };



    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const user = localStorage.getItem('user'); 
    
        if (token && user) {
            setAuth({
                user: JSON.parse(user), 
                token,
            });
        } else {
            setAuth(null);
           
        }
    
        setLoading(false);
    }, []);

 
    useEffect(() => {
        if (auth?.user?.id) {
            fetchedCartCount();
        }
    }, [auth]);
    const fetchedCartCount = async() => {
        try{
            const response = await apiCall('GET',`product-carts?user_id=${auth?.user?.id}`)
          
            setCart(response.data);
            setCartCount(response.data.length);
           

        }
        catch(e){
       console.log(e,"user not found")
        }
    }
    
  console.log(cart,'cart');
    
    const logout = () => {
        setAuth({ user: null, token:null });
        localStorage.removeItem('user'); 
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, showIn, setShowIn, cart, cartCount, setCart, setCartCount,loading,setLoading, orderedProducts, setOrderedProducts, finalTotal, setFinalTotal }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
