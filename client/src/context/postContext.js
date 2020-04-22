import React, { createContext, useState, useCallback } from 'react';

export const PostContext = createContext();

const PostContextProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState();

    const addPost = (post) => {
        const newPosts = [...posts];
        newPosts.unshift(post);
        setPosts(newPosts);
    };

    const deletePost = (postId) => {
        const filtedPosts = posts.filter((post) => {
            return post._id.toString !== postId.toString();
        });
        setPosts(filtedPosts);
    };

    const updateUserData = useCallback((newUserData) => {
        setUserData(newUserData);
    }, []);

    const getUserData = useCallback(() => {
        return userData;
    }, []);

    const fetchUser = async (userId, token) => {
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

            setUserData(resUserData.data.user);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPosts = async () => {
        try {
            const requestBody = {
                query: `
                query{
                    posts(type: NEWEST,limit: 20){
                        _id
                        userId{
                            _id
                            name
                            avatarUrl
                            roles
                        }
                        contentText
                        postImageUrl
                        numberOfLikes
                        numberOfComments
                        isLiked
                        createdAt
                    }
                }
            `,
            };
            const res = await fetch('http://localhost:5000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }

            const resData = await res.json();

            if (resData) {
                setPosts(resData.data.posts);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAddPost = async () => {};

    return (
        <PostContext.Provider
            value={{
                posts,
                setPosts,
                addPost,
                deletePost,
                userData,
                setUserData,
                fetchUser,
                fetchPosts,
            }}
        >
            {props.children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
