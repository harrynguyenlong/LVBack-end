import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Fab } from '@material-ui/core';
import PostItem from './PostItem';
import PostForm from './PostForm';

import AddIcon from '@material-ui/icons/Add';

import { AuthContext, PostContext, UIContext } from '../../context';

const useStyles = makeStyles((theme) => ({
    container: {
        ...theme.layouts.container,
        marginTop: '30px',
        marginBottom: '30px',
        padding: 0,
        // position: 'relative'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '30px',
    },
}));

const PostList = () => {
    const classes = useStyles();
    const { token, userId } = useContext(AuthContext);
    const { posts, fetchPosts } = useContext(PostContext);
    const { tabValue } = useContext(UIContext);
    const [isPostFormOpen, setIsPostFormOpen] = useState(false);
    // const [posts, setPosts] = useState([]);

    const handlePostFormClose = () => {
        setIsPostFormOpen(false);
    };

    useEffect(() => {
        let type = 'NEWEST';
        switch (tabValue) {
            case 0:
                type = 'NEWEST';
                break;
            case 1:
                type = 'TOPCOMMENTS';
                break;
            case 2:
                type = 'TOPLIKES';
                break;
            default:
                type = 'NEWEST';
        }
        const getPosts = async () => {
            await fetchPosts(userId, type);
        };
        getPosts();
        console.log('POSTS', posts);
    }, [userId, tabValue]);

    console.log('POSTLIST RENDER');
    return (
        <section className={classes.container}>
            {token && userId && (
                <div className={classes.buttonContainer}>
                    <Fab
                        color="primary"
                        arial-label="add"
                        size="medium"
                        className={classes.addButton}
                    >
                        <AddIcon onClick={() => setIsPostFormOpen(true)} />
                    </Fab>
                </div>
            )}
            <Grid container spacing={4}>
                {posts &&
                    posts.map((post) => (
                        <Grid item xs={4} key={post._id}>
                            <PostItem post={post} userId={userId} token={token} />
                        </Grid>
                    ))}
            </Grid>

            <PostForm isPostFormOpen={isPostFormOpen} handlePostFormClose={handlePostFormClose} />
        </section>
    );
};

export default PostList;
