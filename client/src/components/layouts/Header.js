import React, { useContext, useEffect, useState } from 'react';

import NavBar from '../Header/NavBar';
import Banner from '../Header/Banner';

import { AuthContext, PostContext } from '../../context';

const Header = () => {
    const { token, userId, logout } = useContext(AuthContext);
    const { fetchUser, userData } = useContext(PostContext);
    // const [userData, setUserData] = useState(null);

    useEffect(() => {
        console.log('header effect run');
        fetchUser(userId, token);
    }, []);

    console.log('HEADER RENDER');
    return (
        <header>
            <NavBar token={token} logout={logout} userData={userData} />
            {token && userId && <Banner userData={userData} />}
        </header>
    );
};

export default Header;
