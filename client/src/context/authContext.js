import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    // const [userId, setUserId] = useState(null);
    // const [name, setName] = useState(null);
    // const [avatarUrl, setAvatarUrl] = useState(null);
    const [user, setUser] = useState(null);

    const login = (token, user) => {
        console.log('context', user);
        setToken(token);
        setUser(user);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
