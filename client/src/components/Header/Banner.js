import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Avatar } from '@material-ui/core';

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';

import EditProfile from '../Profile/EditProfile';

const useStyles = makeStyles((theme) => ({
    banner: {
        height: '210px',
        paddingTop: '30px',
    },
    container: {
        ...theme.layouts.container,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '30px',
        borderBottom: `1px solid ${theme.palette.common.colorGreyLight}`,
    },
    imageContainer: {
        width: '250px',
        minWidth: '150px',
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        // border: `2px solid ${theme.palette.common.colorGreen}`,
        width: theme.spacing(18),
        height: theme.spacing(18),
    },
    info: {
        display: 'flex',
        marginBottom: '10px',
    },
    infoItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: theme.spacing(6),
        // cursor: 'pointer',
        // '&:hover': {
        //     color: theme.palette.common.colorGreen,
        // },
    },
    infoText: {
        // marginRight: theme.spacing(2)
    },
    infoNumber: {
        fontWeight: 500,
    },
    button: {
        ...theme.shared.btn,
        '&:hover': {
            ...theme.shared.btnHover,
        },
        '&:active': {
            ...theme.shared.btnActive,
        },
    },
}));

const Banner = ({ userData }) => {
    const classes = useStyles();

    // const { token, user } = useContext(AuthContext);

    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isListSelected, setIsListSelected] = useState(0);

    const handleEditProfileClose = () => {
        setIsEditProfileOpen(false);
    };

    console.log('BANNER RENDER');

    return (
        <div className={classes.banner}>
            {userData && (
                <div className={classes.container}>
                    <div className={classes.imageContainer}>
                        <Avatar src={userData.avatarUrl} alt="avatar" className={classes.avatar} />
                    </div>
                    <div className={classes.infoContainer}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                            <h1
                                style={{
                                    margin: 0,
                                    marginRight: 20,
                                    fontSize: '24px',
                                    letterSpacing: '2px',
                                }}
                            >
                                {userData.name}
                            </h1>
                            <button
                                className={classes.button}
                                onClick={() => {
                                    setIsEditProfileOpen(true);
                                    setIsListSelected(0);
                                }}
                            >
                                Profile
                            </button>
                        </div>
                        <div className={classes.info}>
                            <div
                                className={classes.infoItem}
                                // onClick={() => {
                                //     setIsEditProfileOpen(true);
                                //     setIsListSelected(2);
                                // }}
                            >
                                <AddAPhotoIcon />
                                <p className={classes.infoText}>
                                    <span className={classes.infoNumber}>
                                        {userData.numberOfPosts}
                                    </span>{' '}
                                    posts
                                </p>
                            </div>
                            <div
                                className={classes.infoItem}
                                // onClick={() => {
                                //     setIsEditProfileOpen(true);
                                //     setIsListSelected(3);
                                // }}
                            >
                                <CommentIcon />
                                <p className={classes.infoText}>
                                    <span className={classes.infoNumber}>
                                        {userData.numberOfComments}
                                    </span>{' '}
                                    comments
                                </p>
                            </div>
                            <div
                                className={classes.infoItem}
                                // onClick={() => {
                                //     setIsEditProfileOpen(true);
                                //     setIsListSelected(4);
                                // }}
                            >
                                <FavoriteIcon />
                                <p className={classes.infoText}>
                                    <span className={classes.infoNumber}>
                                        {userData.numberOfLikes}
                                    </span>{' '}
                                    likes
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <EditProfile
                isEditProfileOpen={isEditProfileOpen}
                handleEditProfileClose={handleEditProfileClose}
                isListSelected={isListSelected}
                setIsListSelected={setIsListSelected}
            />
        </div>
    );
};

export default Banner;
