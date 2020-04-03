import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Avatar } from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles(theme => ({
    postItem: {
        width: '100%',
        color: theme.palette.common.colorBlack,
        // minWidth: 250,
        // maxHeight: 250
        boxShadow: '0rem 0.5rem 1rem rgba(0,0,0, 0.3)',
        cursor: 'pointer',

        position: 'relative',
        '&:hover': {
            '& img': {
                filter: 'brightness(60%)'
            },
            '& $info': {
                opacity: 1
            },
            '& $headerTitle': {
                color: theme.palette.common.colorGreen
            }
        }
    },
    postHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px'
        // border: `1px solid ${theme.palette.common.colorGreyLight}`
    },
    headerTitle: {
        fontSize: '16px',
        lineHeight: '0.8',
        letterSpacing: '1px'
    },
    headerDate: {
        margin: 0,
        padding: 0,
        fontSize: '12px',
        color: theme.palette.common.colorGreyDark
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        // maxWidth: '300px',
        maxHeight: '300px',
        overflow: 'hidden'
    },
    postImage: {
        display: 'block',
        width: '100%',
        height: '100%',
        // objectFit: 'cover',
        transition: 'all 0.3s ease'
        // '&:hover': {
        //     cursor: 'pointer',
        //     filter: 'brightness(60%) ',
        //     boxShadow: '0rem 1rem 2rem rgba(0,0,0, 0.3)'
        // }
    },
    info: {
        position: 'absolute',
        top: 30,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        color: theme.palette.common.colorWhite,
        transition: 'all 0.3s ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    commentLike: {
        display: 'flex',
        alignItems: 'center'
    },
    commentContainer: {
        padding: '0 10px',
        display: 'flex',
        alignItems: 'center'
    }
}));

const PostItem = ({ post }) => {
    const classes = useStyles();
    // const [onHover, setOnHover] = useState(false);
    return (
        <div className={classes.postItem}>
            <div className={classes.postHeader}>
                <Avatar src={post.userId.avatarUrl} alt={post.userId.name} />
                <div style={{ paddingLeft: '10px', margin: 0, width: '100%', height: '100%' }}>
                    <h2 className={classes.headerTitle}>{post.userId.name}</h2>
                    <span className={classes.headerDate}>{post.createdAt}</span>
                </div>
            </div>
            <div className={classes.imageContainer}>
                <img
                    src={post.postImageUrl}
                    alt="post"
                    className={classes.postImage}
                    // onMouseOver={() => setOnHover(true)}
                    // onMouseOut={() => setOnHover(false)}
                />
            </div>
            <div className={classes.info}>
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
        </div>
    );
};

export default PostItem;
