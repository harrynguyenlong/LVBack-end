import React, { createContext, useState } from 'react';

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
        const tempPost = [...posts];
        const filtedPosts = tempPost.filter((post) => {
            return post._id.toString() !== postId.toString();
        });
        setPosts(filtedPosts);
    };

    // const updateUserData = useCallback((newUserData) => {
    //     setUserData(newUserData);
    // }, []);

    // const getUserData = useCallback(() => {
    //     return userData;
    // }, []);

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

    const fetchPosts = async (userId) => {
        try {
            const requestBody = {
                query: `
                query{
                    posts(type: NEWEST,limit: 20, userId: "${userId}"){
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

    // const fetchAddPost = async () => {};

    const fetchLike = async (postId, token) => {
        try {
            const requestBody = {
                query: `
                mutation{
                    likePost(postId: "${postId}"){
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
                    Authorization: 'Bearer ' + token,
                },
            });
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }

            const resData = await res.json();

            // if (resData) {
            //     setPosts(resData.data.posts);
            // }
            // console.log(resData.data.likePost);
            return resData.data.likePost;
        } catch (error) {
            console.log(error);
        }
    };

    const fetchComments = async (postId, token) => {
        try {
            const requestBody = {
                query: `
                query{
                    comments(postId: "${postId}"){
                        _id
                        userId{
                            _id
                            name
                            avatarUrl
                            roles
                        }
                        postId{
                            _id
                            numberOfLikes
                            numberOfComments
                            contentText
                            postImageUrl
                            createdAt
                        }
                        contentText
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
                    Authorization: 'Bearer ' + token,
                },
            });
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }

            const resData = await res.json();

            return resData.data.comments;
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAddComment = async (postId, contentText, token) => {
        try {
            const requestBody = {
                query: `
                mutation{
                    createComment(postId: "${postId}", contentText: "${contentText}"){
                        _id
                        userId{
                            _id
                            name
                            avatarUrl
                            roles
                        }
                        postId{
                            _id
                            numberOfLikes
                            numberOfComments
                            
                        }
                        contentText
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
                    Authorization: 'Bearer ' + token,
                },
            });
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }

            const resData = await res.json();

            return resData.data.createComment;
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDeleteComment = async (commentId, token) => {
        try {
            const requestBody = {
                query: `
                mutation{
                    deleteComment(commentId: "${commentId}"){
                        _id
                        contentText
                        createdAt
                        postId{
                            numberOfComments
                        }
                    }
                }
            `,
            };
            const res = await fetch('http://localhost:5000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            });

            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }

            const resData = await res.json();

            return resData.data.deleteComment;
        } catch (error) {
            console.log(error);
        }
    };

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
                fetchLike,
                fetchAddComment,
                fetchComments,
                fetchDeleteComment,
            }}
        >
            {props.children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
