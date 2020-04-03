import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import PostItem from './PostItem';

const data = [
    {
        _id: '1',
        userId: {
            name: 'Viet Tran',
            avatarUrl: 'https://i.ibb.co/BPvgb3V/avatar-viet.jpg'
        },
        contentText: 'this is content of the post',
        postImageUrl: 'http://placekitten.com/400/400',
        numberOfLikes: 14,
        numberOfComments: 9,
        createdAt: '01.04.2020'
    },
    {
        _id: '2',
        userId: {
            name: 'David',
            avatarUrl: 'https://randomuser.me/api/portraits/med/men/1.jpg'
        },
        contentText: 'this is content of the post',
        postImageUrl: 'http://placekitten.com/400/401',
        numberOfLikes: 14,
        numberOfComments: 9,
        createdAt: '01.04.2020'
    },
    {
        _id: '3',
        userId: {
            name: 'Naomi Walt',
            avatarUrl: 'https://randomuser.me/api/portraits/med/women/3.jpg'
        },
        contentText: 'this is content of the post',
        postImageUrl: 'http://placekitten.com/400/402',
        numberOfLikes: 14,
        numberOfComments: 9,
        createdAt: '01.04.2020'
    },
    {
        _id: '4',
        userId: {
            name: 'Mourinho',
            avatarUrl: 'https://randomuser.me/api/portraits/med/men/5.jpg'
        },
        contentText: 'this is content of the post',
        postImageUrl: 'http://placekitten.com/400/403',
        numberOfLikes: 14,
        numberOfComments: 9,
        createdAt: '01.04.2020'
    },
    {
        _id: '5',
        userId: {
            name: 'Ronaldo',
            avatarUrl: 'https://randomuser.me/api/portraits/med/men/7.jpg'
        },
        contentText: 'this is content of the post',
        postImageUrl: 'http://placekitten.com/400/399',
        numberOfLikes: 14,
        numberOfComments: 9,
        createdAt: '01.04.2020'
    },
    {
        _id: '6',
        userId: {
            name: 'Maria Ozawa',
            avatarUrl: 'https://randomuser.me/api/portraits/med/women/75.jpg'
        },
        contentText: 'this is content of the post',
        postImageUrl: 'http://placekitten.com/400/398',
        numberOfLikes: 14,
        numberOfComments: 9,
        createdAt: '01.04.2020'
    },
    {
        _id: '7',
        userId: {
            name: 'Totti',
            avatarUrl: 'https://randomuser.me/api/portraits/med/men/15.jpg'
        },
        contentText: 'this is content of the post',
        postImageUrl: 'http://placekitten.com/400/404',
        numberOfLikes: 14,
        numberOfComments: 9,
        createdAt: '01.04.2020'
    },
    {
        _id: '8',
        userId: {
            name: 'VacCayQuaNui',
            avatarUrl: 'https://randomuser.me/api/portraits/med/men/34.jpg'
        },
        contentText: 'this is content of the post',
        postImageUrl: 'http://placekitten.com/400/400',
        numberOfLikes: 14,
        numberOfComments: 9,
        createdAt: '01.04.2020'
    },
    {
        _id: '9',
        userId: {
            name: 'Ngoc Trinh',
            avatarUrl: 'https://randomuser.me/api/portraits/med/women/25.jpg'
        },
        contentText: 'this is content of the post',
        postImageUrl: 'http://placekitten.com/400/405',
        numberOfLikes: 14,
        numberOfComments: 9,
        createdAt: '01.04.2020'
    }
];

const useStyles = makeStyles(theme => ({
    container: {
        ...theme.layouts.container,
        marginTop: '30px',
        marginBottom: '30px',
        padding: 0
    }
}));

const PostList = () => {
    const classes = useStyles();
    return (
        <section className={classes.container}>
            <Grid container spacing={4}>
                {data.map(post => {
                    return (
                        <Grid item xs={4} key={post._id}>
                            <PostItem post={post} />
                        </Grid>
                    );
                })}
            </Grid>
        </section>
    );
};

export default PostList;
