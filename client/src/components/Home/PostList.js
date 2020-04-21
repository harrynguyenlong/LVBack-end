import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Fab, Hidden } from '@material-ui/core';
import PostItem from './PostItem';
import PostForm from './PostForm';

import AddIcon from '@material-ui/icons/Add';

import { AuthContext, PostContext } from '../../context';

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
    const { posts, setPosts } = useContext(PostContext);
    const [isPostFormOpen, setIsPostFormOpen] = useState(false);
    // const [posts, setPosts] = useState([]);

    const handlePostFormClose = () => {
        setIsPostFormOpen(false);
    };

    useEffect(() => {
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
        const loadPosts = async () => {
            try {
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
        loadPosts();
    }, [posts]);

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
