import React, { useContext, useEffect } from 'react';

import NavBar from '../Header/NavBar';
import Banner from '../Header/Banner';

import { AuthContext, PostContext } from '../../context';

const Header = () => {
    const { token, userId, logout } = useContext(AuthContext);
    const { fetchUser, userData } = useContext(PostContext);

    useEffect(() => {
        console.log('header effect run');
        if (userId && token) {
            fetchUser(userId, token);
        }
    }, [userId, token]);

    console.log('HEADER RENDER');
    return (
        <header>
            <NavBar token={token} logout={logout} userData={userData} userId={userId} />
            {token && userId && <Banner userData={userData} />}
        </header>
    );
};

export default Header;
