import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PostDetail from './PostDetail';

const useStyles = makeStyles((theme) => ({
    postItem: {
        width: '100%',
        color: theme.palette.common.colorBlack,
        // minWidth: 250,
        // maxHeight: 250
        boxShadow: '0rem 0.5rem 1rem rgba(0,0,0, 0.3)',
        // cursor: 'pointer',

        position: 'relative',
        // '&:hover': {
        //     '& img': {
        //         filter: 'brightness(60%)',
        //     },
        //     '& $info': {
        //         opacity: 1,
        //     },
        //     '& $headerTitle': {
        //         color: theme.palette.common.colorGreen,
        //     },
        // },
    },
    postHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        // border: `1px solid ${theme.palette.common.colorGreyLight}`
    },
    headerTitle: {
        fontSize: '16px',
        lineHeight: '0.8',
        letterSpacing: '1px',
    },
    headerDate: {
        margin: 0,
        padding: 0,
        fontSize: '12px',
        color: theme.palette.common.colorGreyDark,
    },
    headerIcons: {
        display: 'flex',
        alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        // maxWidth: '300px',
        maxHeight: '300px',
        overflow: 'hidden',
    },
    postImage: {
        display: 'block',
        width: '100%',
        height: '100%',
        // objectFit: 'cover',
        transition: 'all 0.3s ease',
        '&:hover': {
            cursor: 'pointer',
            filter: 'brightness(60%) ',
            boxShadow: '0rem 1rem 2rem rgba(0,0,0, 0.3)',
        },
    },
    info: {
        // position: 'absolute',
        // top: 30,
        // left: 0,
        width: '100%',
        height: '100px',

        color: theme.palette.common.colorBlack,
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    contentText: {
        height: '36.8px',
        padding: ' 0 10px',
        marginBottom: '10px',
        fontSize: '14px',
        // overflow: 'hidden',
        // whiteSpace: 'nowrap',
        // textOverflow: 'ellipsis',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        color: theme.palette.common.colorGreyDark,
        cursor: 'pointer',
    },
    commentLike: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    commentContainer: {
        padding: '0 10px',
        display: 'flex',
        alignItems: 'center',
    },
}));

const PostItem = ({ post, edit }) => {
    const classes = useStyles();
    // const [onHover, setOnHover] = useState(false);
    const [isPostDetailOpen, setIsPostDetailOpen] = useState(false);

    const handlePostDetailClose = () => {
        setIsPostDetailOpen(false);
    };

    return (
        <div className={classes.postItem}>
            <div className={classes.postHeader}>
                <Avatar src={post.userId.avatarUrl} alt={post.userId.name} />
                <div style={{ paddingLeft: '10px', margin: 0, width: '100%', height: '100%' }}>
                    <h2 className={classes.headerTitle}>{post.userId.name}</h2>
                    <span className={classes.headerDate}>{post.createdAt}</span>
                </div>
                {edit && (
                    <div className={classes.headerIcons}>
                        <EditIcon color="primary" />
                        <DeleteIcon color="secondary" style={{ marginLeft: '10px' }} />
                    </div>
                )}
            </div>
            <div className={classes.imageContainer}>
                <img
                    src={post.postImageUrl}
                    alt="post"
                    className={classes.postImage}
                    onClick={() => {
                        setIsPostDetailOpen(true);
                    }}
                    // onMouseOver={() => setOnHover(true)}
                    // onMouseOut={() => setOnHover(false)}
                />
            </div>
            <div className={classes.info}>
                <p className={classes.contentText} onClick={() => setIsPostDetailOpen(true)}>
                    {post.contentText}
                </p>
                <div className={classes.commentLike}>
                    <div className={classes.commentContainer}>
                        <FavoriteIcon style={{ marginRight: '5px' }} />
                        <span>{post.numberOfLikes}</span>
                    </div>
                    <div className={classes.commentContainer}>
                        <CommentIcon style={{ marginRight: '5px' }} />
                        <span>{post.numberOfComments}</span>
                    </div>
                </div>
            </div>
            <PostDetail
                post={post}
                edit={edit}
                isPostDetailOpen={isPostDetailOpen}
                handlePostDetailClose={handlePostDetailClose}
            />
        </div>
    );
};

export default PostItem;
