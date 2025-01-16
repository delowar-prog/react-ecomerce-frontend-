import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: null,
    });

    const login = (user, token) => {
        setAuth({ user, token });
        localStorage.setItem('user', user); // Save user to localStorage
        localStorage.setItem('access_token', token); // Save token to localStorage
    };
    // Restore auth state from localStorage on app load
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const user = localStorage.getItem('user');
        console.log(typeof(user));
        if (token) {
            setAuth((prev) => ({ ...prev,user, token }));
        }
    }, []);
    console.log(auth,'auth');



    const logout = () => {
        setAuth({ user: null, token: null });
        localStorage.removeItem('access_token'); // Clear token from localStorage
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
