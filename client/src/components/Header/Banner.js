import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Avatar } from '@material-ui/core';

import avatarViet from '../../assets/images/avatar-viet.jpg';
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
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.common.colorGreen,
        },
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

const Banner = () => {
    const classes = useStyles();

    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

    const handleEditProfileClose = () => {
        setIsEditProfileOpen(false);
    };

    return (
        <div className={classes.banner}>
            <div className={classes.container}>
                <div className={classes.imageContainer}>
                    <Avatar src={avatarViet} alt="avatar" className={classes.avatar} />
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
                            Viet Tran
                        </h1>
                        <button
                            className={classes.button}
                            onClick={() => setIsEditProfileOpen(true)}
                        >
                            Profile
                        </button>
                    </div>
                    <div className={classes.info}>
                        <div className={classes.infoItem}>
                            <AddAPhotoIcon />
                            <p className={classes.infoText}>
                                <span className={classes.infoNumber}>132</span> posts
                            </p>
                        </div>
                        <div className={classes.infoItem}>
                            <CommentIcon />
                            <p className={classes.infoText}>
                                <span className={classes.infoNumber}>78</span> comments
                            </p>
                        </div>
                        <div className={classes.infoItem}>
                            <FavoriteIcon />
                            <p className={classes.infoText}>
                                <span className={classes.infoNumber}>239</span> likes
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <EditProfile
                isEditProfileOpen={isEditProfileOpen}
                handleEditProfileClose={handleEditProfileClose}
            />
        </div>
    );
};

export default Banner;
