import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    comment: {
        width: '100%',
        height: '100%',
        display: 'flex',
        // alignItems: 'center',
        marginTop: '20px',
    },
    content: {
        minHeight: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    contentText: {
        fontSize: '14px',
    },
    date: {
        fontSize: '11px',
        marginTop: '10px',
        color: theme.palette.common.colorGreyDark,
    },
}));

const Comment = ({ comment }) => {
    const classes = useStyles();
    console.log('COMMENT RENDER');
    return (
        <li className={classes.comment}>
            <div style={{ marginRight: '10px' }}>
                <Avatar src={comment.userId.avatarUrl} alt={comment.userId.name} />
            </div>
            <div className={classes.content}>
                <p className={classes.contentText}>
                    <span style={{ fontWeight: 'bold' }}>{`${comment.userId.name}: `}</span>
                    {comment.contentText}
                </p>
                <p className={classes.date}>{new Date(comment.createdAt * 1).toLocaleString()}</p>
            </div>
        </li>
    );
};

export default Comment;
