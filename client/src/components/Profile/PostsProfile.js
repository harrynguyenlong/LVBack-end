import React from 'react';
import { makeStyles } from '@material-ui/styles';

import PostProfileItem from './PostProfileItem';

const useStyles = makeStyles((theme) => ({}));

const PostsProfile = () => {
    const classes = useStyles();

    return (
        <div>
            <PostProfileItem />
            <PostProfileItem />
            <PostProfileItem />
            <PostProfileItem />
            <PostProfileItem />
            <PostProfileItem />
        </div>
    );
};

export default PostsProfile;
