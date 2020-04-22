import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('ishare-token'));
    const [userId, setUserId] = useState(localStorage.getItem('ishare-userId'));

    const login = (token, userId) => {
        setToken(token);
        setUserId(userId);
        localStorage.setItem('ishare-token', token);
        localStorage.setItem('ishare-userId', userId);
        // console.log('login', userId, token);
    };

    const logout = () => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('ishare-token');
        localStorage.removeItem('ishare-userId');
    };

    return (
        <AuthContext.Provider value={{ token, userId, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
