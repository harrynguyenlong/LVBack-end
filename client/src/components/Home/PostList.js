import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Fab, Hidden } from '@material-ui/core';
import PostItem from './PostItem';
import PostForm from './PostForm';

import AddIcon from '@material-ui/icons/Add';

import { AuthContext } from '../../context';

const data = [
    {
        _id: '1',
        userId: {
            name: 'Viet Tran',
            avatarUrl: 'https://i.ibb.co/BPvgb3V/avatar-viet.jpg',
        },
        contentText:
            'this is content of the post. this is content of the post. this is content of the post. this is content of the post',
        postImageUrl: 'http://placekitten.com/400/400',
        numberOfLikes: 14,
        numberOfComments: 9,
        createdAt: '01.04.2020',
    },
    {
        _id: '2',
        userId: {
            name: 'David',
            avatarUrl: 'https://randomuser.me/api/portraits/med/men/1.jpg',
        },
        contentText:
            '🥰 😇 Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ',
        postImageUrl: 'http://placekitten.com/400/401',
        numberOfLikes: 14,
        numberOfComments: 9,
        createdAt: '01.04.2020',
    },
    {
        _id: '3',
        userId: {
            name: 'Naomi Walt',
            avatarUrl: 'https://randomuser.me/api/portraits/med/women/3.jpg',
        },
        contentText: 'this is content of the post',
        postImageUrl: 'http://placekitten.com/400/402',
        numberOfLikes: 14,
        numberOfComments: 9,
        createdAt: '01.04.2020',
    },
    {
        _id: '4',
        userId: {
            name: 'Mourinho',
            avatarUrl: 'https://randomuser.me/api/portraits/med/men/5.jpg',
        },
        contentText: 'this is content of the post',
        postImageUrl: 'http://placekitten.com/400/403',
        numberOfLikes: 14,
        numberOfComments: 9,
        createdAt: '01.04.2020',
    },
    {
        _id: '5',
        userId: {
            name: 'Ronaldo',
            avatarUrl: 'https://randomuser.me/api/portraits/med/men/7.jpg',
        },
        contentText: 'this is content of the post',
        postImageUrl: 'http://placekitten.com/400/399',
        numberOfLikes: 14,
        numberOfComments: 9,
        createdAt: '01.04.2020',
    },
    {
        _id: '6',
        userId: {
            name: 'Maria Ozawa',
            avatarUrl: 'https://randomuser.me/api/portraits/med/women/75.jpg',
        },
        contentText: 'this is content of the post',
        postImageUrl: 'http://placekitten.com/400/398',
        numberOfLikes: 14,
        numberOfComments: 9,
        createdAt: '01.04.2020',
    },
    {
        _id: '7',
        userId: {
            name: 'Totti',
            avatarUrl: 'https://randomuser.me/api/portraits/med/men/15.jpg',
        },
        contentText: 'this is content of the post',
        postImageUrl: 'http://placekitten.com/400/404',
        numberOfLikes: 14,
        numberOfComments: 9,
        createdAt: '01.04.2020',
    },
    {
        _id: '8',
        userId: {
            name: 'VacCayQuaNui',
            avatarUrl: 'https://randomuser.me/api/portraits/med/men/34.jpg',
        },
        contentText: 'this is content of the post',
        postImageUrl: 'http://placekitten.com/400/400',
        numberOfLikes: 14,
        numberOfComments: 9,
        createdAt: '01.04.2020',
    },
    {
        _id: '9',
        userId: {
            name: 'Ngoc Trinh',
            avatarUrl: 'https://randomuser.me/api/portraits/med/women/25.jpg',
        },
        contentText: 'this is content of the post',
        postImageUrl: 'http://placekitten.com/400/405',
        numberOfLikes: 14,
        numberOfComments: 9,
        createdAt: '01.04.2020',
    },
];

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
    const { token, user } = useContext(AuthContext);
    const [isPostFormOpen, setIsPostFormOpen] = useState(false);
    const [posts, setPosts] = useState([]);

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
    }, []);

    return (
        <section className={classes.container}>
            {token && user && (
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
                            <PostItem post={post} />
                        </Grid>
                    ))}
            </Grid>

            <PostForm isPostFormOpen={isPostFormOpen} handlePostFormClose={handlePostFormClose} />
        </section>
    );
};

export default PostList;
