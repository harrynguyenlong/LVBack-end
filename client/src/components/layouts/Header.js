import React, { useContext } from 'react';

import NavBar from '../Header/NavBar';
import Banner from '../Header/Banner';

import { AuthContext } from '../../context';

const Header = () => {
    const { token, userId } = useContext(AuthContext);
    return (
        <header>
            <NavBar />
            {token && userId && <Banner />}
        </header>
    );
};

export default Header;
