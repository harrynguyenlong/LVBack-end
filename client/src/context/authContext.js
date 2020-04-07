import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = (token, userId) => {
        setToken(token);
        setUserId(userId);
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
