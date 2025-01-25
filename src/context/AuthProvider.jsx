import apiCall from '@/api/axiosInstance';
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: {},
        token: null,
    });
    const [showIn, setShowIn] = useState(false);
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    
    const login = (user, token) => {
        setAuth({ user, token });

        localStorage.setItem('user', JSON.stringify(user)); 
        localStorage.setItem('access_token', token); 
    };



    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const user = localStorage.getItem('user'); 

        if (token && user) {
            setAuth({
                user: JSON.parse(user), 
                token,
            });
        }
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
        setAuth({ user: null, token: null });
        localStorage.removeItem('user'); 
        localStorage.removeItem('access_token');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, showIn, setShowIn, cart, cartCount, setCart, setCartCount }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
