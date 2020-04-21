import React, { useContext, useEffect, useState } from 'react';

import NavBar from '../Header/NavBar';
import Banner from '../Header/Banner';

import { AuthContext } from '../../context';

const Header = () => {
    const { token, userId, login, logout } = useContext(AuthContext);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const loadUserData = async () => {
            console.log('useeffect token', token);
            console.log('useeffect userId', userId);
            try {
                const requestBody = {
                    query: `
                    query{
                        user(userId: "${userId}"){
                            _id
                            name
                            email
                            avatarUrl
                            roles
                            numberOfPosts
                            numberOfComments
                            numberOfLikes
                        }
                    }
                `,
                };

                const resUser = await fetch('http://localhost:5000/graphql', {
                    method: 'POST',
                    body: JSON.stringify(requestBody),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                });

                if (resUser.status !== 200 && resUser.status !== 201) {
                    throw new Error('Could not get user data');
                }

                const resUserData = await resUser.json();

                // console.log('cac', resUserData.data.user);
                setUserData(resUserData.data.user);
            } catch (error) {
                console.log(error);
            }
        };
        loadUserData();
    }, []);

    return (
        <header>
            <NavBar token={token} userData={userData} login={login} logout={logout} />
            {token && userId && <Banner userData={userData} />}
        </header>
    );
};

export default Header;
