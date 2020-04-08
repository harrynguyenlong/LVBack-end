import React from 'react';
import { makeStyles } from '@material-ui/styles';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    postProfileItem: {
        height: '100px',
        width: '100%',
        marginBottom: '20px',
        border: `1px solid ${theme.palette.common.colorGreyLight}`,
        display: 'flex',
    },
    imageContainer: {
        height: '100px',
        width: '100px',
    },
    image: {
        display: 'block',
        width: '99px',
        height: '99px',
    },
    content: {
        padding: '0 20px',
    },
    action: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 10px',
        borderLeft: `1px solid ${theme.palette.common.colorGreyLight}`,
    },
}));

const PostProfileItem = () => {
    const classes = useStyles();

    return (
        <div className={classes.postProfileItem}>
            <div className={classes.imageContainer}>
                <img
                    src="http://placekitten.com/400/400"
                    alt="post item"
                    className={classes.image}
                />
            </div>
            <div className={classes.content}>
                <p>
                    🥰 😇 Contrary to popular belief, Lorem Ipsum is not simply random text. It has
                    roots in a piece of classical Latin literature from 45 BC, making it over 2000
                    years old.
                </p>
            </div>
            <div className={classes.action}>
                <EditIcon />
            </div>
            <div className={classes.action}>
                <DeleteIcon />
            </div>
        </div>
    );
};

export default PostProfileItem;
