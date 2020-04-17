import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('access_token'));
    const [userId, setUserId] = useState(localStorage.getItem('user_id'));

    const login = (token, userId) => {
        setToken(token);
        setUserId(userId);

        // Save JWT token and user_id 
        localStorage.setItem('access_token', token);
        localStorage.setItem('user_id', userId);
    };

    const logout = () => {
        setToken(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ token, userId, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
