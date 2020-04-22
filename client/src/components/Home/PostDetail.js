import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Grid,
    Avatar,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SendIcon from '@material-ui/icons/Send';

import Spinner from '../Spinner/Spinner';

import { PostContext } from '../../context';

const useStyles = makeStyles((theme) => ({
    postDetail: {},
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
    },
    dialogTitleWrapper: {
        paddingTop: 0,
        paddingBottom: 0,
        background: theme.palette.common.colorGreen,
    },
    dialogTitle: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: theme.palette.common.colorWhite,
    },
    imageContainer: {
        padding: '10px 40px 0 40px',
        maxHeight: 'calc(100vh - 88px)',
    },
    image: {
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    infoContainer: {
        padding: '10px 0 0 20px',
        minHeight: '200px',
        position: 'relative',
    },
    postHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        // padding: '10px 0',
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
    postContentText: {
        marginBottom: '20px',
    },
    commentLikeContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '40px',
        borderTop: `1px solid ${theme.palette.common.colorGreyLight}`,
        borderBottom: `1px solid ${theme.palette.common.colorGreyLight}`,
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
    like: {
        '&:hover': {
            color: theme.palette.common.colorGreen,
            cursor: 'pointer',
        },
    },
    liked: {
        color: theme.palette.common.colorRed,
    },
    commentForm: {
        position: 'absolute',
        left: 20,
        bottom: 0,
        width: '100%',
        paddingTop: '10px',
        paddingRight: '24px',
        display: 'flex',
        alignItems: 'center',
        marginTop: '50px',
        // borderTop: `1px solid ${theme.palette.common.colorGreyLight}`,
    },
    commentInputContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },

    commentInput: {
        marginLeft: '10px',
        height: '32px',
        width: '100%',
        borderRadius: '50px',
        fontSize: '14px',
        padding: '0 10px',
        border: `1px solid ${theme.palette.common.colorGreyLight}`,
        outline: 'none',
    },
    commentInputButton: {
        marginLeft: '10px',
        '&:hover': {
            color: theme.palette.common.colorGreen,
            cursor: 'pointer',
        },
    },
}));

const PostDetail = ({ isPostDetailOpen, handlePostDetailClose, postItem, edit, token }) => {
    const classes = useStyles();

    const [post, setPost] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log('post detail effect');
        setPost(postItem);
    }, []);

    const { fetchLike } = useContext(PostContext);

    const handleLikeSubmit = async (postId) => {
        setIsLoading(true);
        const res = await fetchLike(postId, token);
        setPost(res);
        setIsLoading(false);
    };

    if (post) console.log('POST DETAIL RENDER');
    return (
        <div classes={classes.postDetail}>
            <Dialog open={isLoading}>
                <Spinner />
            </Dialog>
            <Dialog
                open={isPostDetailOpen}
                onClose={handlePostDetailClose}
                // style={{ width: '900px' }}
                // fullWidth={true}
                fullScreen={true}
                // classes={{ paper: classes.dialogPaper }}
            >
                <DialogTitle
                    id="customized-dialog-title"
                    onClose={handlePostDetailClose}
                    className={classes.dialogTitleWrapper}
                >
                    <div className={classes.dialogTitle}>
                        <Typography style={{ fontWeight: '500' }}>Post Detail</Typography>

                        <IconButton onClick={handlePostDetailClose}>
                            <CloseIcon style={{ color: 'white' }} />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    {post && (
                        <Grid container>
                            <Grid item xs={7} className={classes.imageContainer}>
                                <img
                                    src={'http://localhost:5000/' + post.postImageUrl}
                                    alt="post"
                                    className={classes.image}
                                />
                            </Grid>
                            <Grid item xs={5} className={classes.infoContainer}>
                                <div className={classes.postHeader}>
                                    <Avatar src={post.userId.avatarUrl} alt={post.userId.name} />
                                    <div
                                        style={{
                                            paddingLeft: '10px',
                                            margin: 0,
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <h2 className={classes.headerTitle}>{post.userId.name}</h2>
                                        <span className={classes.headerDate}>
                                            {new Date(post.createdAt * 1).toLocaleString()}
                                        </span>
                                    </div>
                                    {edit && (
                                        <div className={classes.headerIcons}>
                                            <EditIcon color="primary" />
                                            <DeleteIcon
                                                color="secondary"
                                                style={{ marginLeft: '10px' }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className={classes.postContentText}>
                                    <p>{post.contentText}</p>
                                </div>
                                <div className={classes.commentLikeContainer}>
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
                                    <div
                                        onClick={() => handleLikeSubmit(post._id)}
                                        className={classes.like}
                                    >
                                        {post.isLiked === true ? (
                                            <FavoriteIcon className={classes.liked} />
                                        ) : (
                                            <FavoriteBorderIcon />
                                        )}
                                    </div>
                                </div>
                                <div className={classes.commentForm}>
                                    <Avatar src={post.userId.avatarUrl} alt={post.userId.name} />
                                    <div className={classes.commentInputContainer}>
                                        <input type="text" className={classes.commentInput} />
                                        <SendIcon className={classes.commentInputButton} />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default React.memo(PostDetail);
