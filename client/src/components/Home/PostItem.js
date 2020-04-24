import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Avatar,
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    Divider,
    Snackbar,
} from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PostDetail from './PostDetail';
import EditPost from './EditPost';

import { PostContext } from '../../context';

const useStyles = makeStyles((theme) => ({
    postItem: {
        width: '100%',
        color: theme.palette.common.colorBlack,
        boxShadow: '0rem 0.5rem 1rem rgba(0,0,0, 0.3)',
        position: 'relative',
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
    actionIcons: {
        cursor: 'pointer',
        color: theme.palette.common.colorGreyDark,
        transition: 'all 0.3s ease',
    },
    editIcon: {
        '&:hover': {
            color: theme.palette.common.colorGreen,
        },
    },
    deleteIcon: {
        '&:hover': {
            color: theme.palette.secondary.main,
        },
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
        height: '250px',
        maxWidth: '300px',
        maxHeight: '300px',
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
        height: '38px',
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
    snackbar: {
        background: theme.palette.common.colorGreen,
        fontSize: '14px',
    },
    liked: {
        color: theme.palette.common.colorRed,
    },
}));

const PostItem = ({
    post,
    userId,
    token,
    isPostFormOpen,
    handlePostFormClose,
    setIsPostFormOpen,
}) => {
    const classes = useStyles();
    // const [onHover, setOnHover] = useState(false);
    // const { token } = useContext(AuthContext);
    const { deletePost, setUserData, fetchPosts, fetchUser } = useContext(PostContext);
    const [isPostDetailOpen, setIsPostDetailOpen] = useState(false);
    const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
    const [isShowSnackbar, setIsShowSnackbar] = useState(false);
    const [isEditPost, setIsEditPost] = useState(false);

    const handlePostDetailClose = () => {
        setIsPostDetailOpen(false);
        // console.log('detail close');
        fetchPosts(userId);
        fetchUser(userId, token);
    };

    const handleDeleteConfirmClose = () => {
        setIsDeleteConfirm(false);
    };

    const handleEditPostClose = () => {
        setIsEditPost(false);
    };

    const handleDeletePost = async (event, postId) => {
        event.preventDefault();
        try {
            const requestBody = {
                query: `
                mutation{
                    deletePost(postId: "${postId}"){
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

            const resDeletePost = await fetch('http://localhost:5000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            });

            if (resDeletePost.status !== 200 && resDeletePost.status !== 201) {
                throw new Error('Delete post failed');
            }

            const resDeletePostData = await resDeletePost.json();
            // console.log(resDeletePostData.data.deletePost);
            deletePost(postId);
            setUserData(resDeletePostData.data.deletePost);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={classes.postItem}>
            <div className={classes.postHeader}>
                <Avatar src={post.userId.avatarUrl} alt={post.userId.name} />
                <div style={{ paddingLeft: '10px', margin: 0, width: '100%', height: '100%' }}>
                    <h2 className={classes.headerTitle}>{post.userId.name}</h2>
                    <span className={classes.headerDate}>
                        {new Date(post.createdAt * 1).toLocaleString()}
                    </span>
                </div>
                {userId && userId === post.userId._id && (
                    <div className={classes.headerIcons}>
                        <EditIcon
                            className={`${classes.actionIcons} ${classes.editIcon}`}
                            onClick={() => setIsEditPost(true)}
                        />
                        <DeleteIcon
                            className={`${classes.actionIcons} ${classes.deleteIcon}`}
                            style={{
                                marginLeft: '10px',
                            }}
                            // onClick={(event) => handleDeletePost(event, post._id)}
                            onClick={() => setIsDeleteConfirm(true)}
                        />
                    </div>
                )}
            </div>
            <div className={classes.imageContainer}>
                <img
                    src={'http://localhost:5000/' + post.postImageUrl}
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
                        <FavoriteIcon
                            style={{ marginRight: '5px' }}
                            className={post.isLiked ? classes.liked : null}
                        />
                        <span>{post.numberOfLikes}</span>
                    </div>
                    <div className={classes.commentContainer}>
                        <CommentIcon style={{ marginRight: '5px' }} />
                        <span>{post.numberOfComments}</span>
                    </div>
                </div>
            </div>
            {isPostDetailOpen && (
                <PostDetail
                    postItem={post}
                    // edit={edit}

                    isPostDetailOpen={isPostDetailOpen}
                    handlePostDetailClose={handlePostDetailClose}
                    userId={userId}
                    token={token}
                />
            )}

            {/* Show confirm dialog when delete button clicked */}
            <Dialog
                open={isDeleteConfirm}
                onClose={handleDeleteConfirmClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ padding: '10px 16px', margin: 0 }}>
                    <p style={{ fontSize: '16px' }}>Are you sure to delete this post?</p>
                </DialogTitle>
                <Divider />
                <DialogActions>
                    <Button onClick={handleDeleteConfirmClose}>No</Button>
                    <Button
                        onClick={(event) => {
                            handleDeletePost(event, post._id);
                            handleDeleteConfirmClose();
                            setIsShowSnackbar(true);
                        }}
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Show snackbar if delete success */}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={isShowSnackbar}
                autoHideDuration={3000}
                onClose={() => setIsShowSnackbar(false)}
                message="Delete post successfully!"
                ContentProps={{
                    classes: { root: classes.snackbar },
                }}
            />

            {/* Show edit post form */}
            {isEditPost && (
                <EditPost
                    isEditPost={isEditPost}
                    handleEditPostClose={handleEditPostClose}
                    post={post}
                />
            )}
        </div>
    );
};

export default React.memo(PostItem);
