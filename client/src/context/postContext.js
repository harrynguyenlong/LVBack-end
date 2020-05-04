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

    const editPost = (updatedPost) => {
        const tempPost = [...posts];
        const editPost = tempPost.find(
            (post) => post._id.toString() === updatedPost._id.toString()
        );
        editPost.contentText = updatedPost.contentText;
        editPost.postImageUrl = updatedPost.postImageUrl;
        console.log(tempPost);
        console.log('edit post', editPost);
    };

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

    const fetchEditUserInfo = async (name, email, avatarUrl, token) => {
        try {
            const requestBody = {
                query: `
                mutation{
                    editUserInfo(name: "${name}", email: "${email}", avatarUrl: "${avatarUrl}"){
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

            setUserData(resData.data.editUserInfo);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchEditUserPassword = async (oldPassword, newPassword, token) => {
        try {
            const requestBody = {
                query: `
                mutation{
                    editUserPassword(oldPassword: "${oldPassword}", newPassword: "${newPassword}"){
                        status
                        message
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
            return resData.data.editUserPassword;
            // console.log(resData);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPosts = async (userId, type = 'NEWEST', limit = 24) => {
        try {
            const requestBody = {
                query: `
                query{
                    posts(type: ${type},limit: ${limit}, userId: "${userId}"){
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

            console.log('POSTS RESDAGA', resData.data.posts);

            if (resData) {
                setPosts(resData.data.posts);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPostsByUser = async (userId, token) => {
        try {
            const requestBody = {
                query: `
                query{
                    postsByUser(userId: "${userId}"){
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

            return resData.data.postsByUser;
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUploadImage = async (type, formData, token) => {
        try {
            const imageRes = await fetch(`http://localhost:5000/upload/${type}`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                body: formData,
            });

            if (imageRes.status !== 200 && imageRes.status !== 201) {
                throw new Error('Upload image failed');
            }

            const imageResData = await imageRes.json();
            return imageResData.filePath;
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAddPost = async (contentText, postImageUrl, token) => {
        try {
            const requestBody = {
                query: `
                    mutation {
                        createPost(
                            contentText: "${contentText}",
                            postImageUrl: "${postImageUrl}"
                        ) {
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
                            createdAt
                            isLiked
                        }
                    }
                `,
            };

            const postRes = await fetch('http://localhost:5000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            });

            const postResData = await postRes.json();

            console.log('postResData', postResData.errors);

            if (postResData.errors) {
                console.log('CCCC', postResData.errors.message, postResData.errors.field);
                throw new Error(postResData.errors);
            }

            console.log('NO ERROR');
            // if (postRes.status !== 200 && postRes.status !== 201) {
            //     throw new Error('CT Create new post failed');
            // }

            addPost(postResData.data.createPost);
            return postResData.data.createPost;
        } catch (error) {
            console.log('POST CONTEXT ERROR', error.message, error.field);
            return new Error(error.message);
        }
    };

    const fetchEditPost = async (postId, contentText, postImageUrl, token) => {
        try {
            const requestBody = {
                query: `
                mutation{
                    editPost(postId: "${postId}", contentText: "${contentText}", postImageUrl: "${postImageUrl}"){
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

            editPost(resData.data.editPost);
        } catch (error) {
            console.log(error);
        }
    };

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
                fetchEditPost,
                fetchUploadImage,
                fetchAddPost,
                fetchEditUserInfo,
                fetchEditUserPassword,
                fetchPostsByUser,
            }}
        >
            {props.children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
