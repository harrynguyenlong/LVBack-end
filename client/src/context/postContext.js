import React, { createContext, useState } from 'react';

export const PostContext = createContext();

const PostContextProvider = (props) => {
    const [posts, setPosts] = useState([]);

    const deletePost = (postId) => {
        const filtedPosts = posts.filter((post) => {
            return post._id.toString !== postId.toString();
        });
        setPosts(filtedPosts);
    };

    return (
        <PostContext.Provider value={{ posts, setPosts, deletePost }}>
            {props.children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
