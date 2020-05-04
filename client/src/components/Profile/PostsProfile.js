import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

// import PostProfileItem from './PostProfileItem';
import PostItem from '../Home/PostItem';
import { AuthContext, PostContext } from '../../context';

const useStyles = makeStyles((theme) => ({}));

const PostsProfile = () => {
    const classes = useStyles();
    const { token, userId } = useContext(AuthContext);
    const { fetchPostsByUser } = useContext(PostContext);
    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        console.log('post profile effect');
        const getMyPosts = async () => {
            const resMyPosts = await fetchPostsByUser(userId, token);
            console.log('resmypost', resMyPosts);
            setMyPosts(resMyPosts);
        };
        getMyPosts();
    }, []);

    console.log('POST PROFILE RENDER');
    return (
        <Grid container spacing={2}>
            {myPosts &&
                myPosts.map((post) => (
                    <Grid item xs={6} key={post._id}>
                        <PostItem post={post} userId={userId} token={token} />
                    </Grid>
                ))}
        </Grid>
    );
};

export default PostsProfile;
