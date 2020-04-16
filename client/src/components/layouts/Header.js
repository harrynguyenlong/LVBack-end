import React, { useContext, useEffect, useState } from 'react';

import NavBar from '../Header/NavBar';
import Banner from '../Header/Banner';

import { AuthContext } from '../../context';

const Header = () => {
    const { token, user } = useContext(AuthContext);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user) {
            const requestBody = {
                query: `
                    query{
                        user(userId: "${user.userId}"){
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
            fetch('http://localhost:5000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            })
                .then((res) => {
                    if (res.status !== 200 && res.status !== 201) {
                        throw new Error('Failed!');
                    }
                    return res.json();
                })
                .then((resData) => {
                    console.log(resData.data.user);
                    setUserData(resData.data.user);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user]);

    return (
        <header>
            <NavBar />
            {token && user && <Banner userData={userData} />}
        </header>
    );
};

export default Header;
