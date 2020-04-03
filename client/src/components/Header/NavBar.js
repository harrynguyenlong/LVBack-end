import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Badge } from '@material-ui/core';

import logo from '../../assets/images/iShare-logo1.png';
import avatarViet from '../../assets/images/avatar-viet.jpg';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(theme => ({
    navbar: {
        height: '54px',
        borderBottom: `1px solid ${theme.palette.common.colorGreyLight}`,
        backgroundColor: theme.palette.common.colorWhite
    },
    container: {
        ...theme.layouts.container,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logoContainer: {
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    logo: {
        display: 'inline-block',
        height: '60%',
        marginRight: '5px'
    },
    logoText: {
        fontSize: '24px',
        fontWeight: 700,
        color: theme.palette.common.colorBlack,
        letterSpacing: '2px'
    },
    logoTextSpec: {
        fontWeight: '900',
        color: theme.palette.common.colorGreen
    },
    actionIcons: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        fontSize: '24px',
        marginRight: '32px',
        color: theme.palette.common.colorBlack
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4)
    }
}));

const NavBar = () => {
    const classes = useStyles();
    return (
        <div className={classes.navbar}>
            <div className={classes.container}>
                <div className={classes.logoContainer}>
                    <img src={logo} alt="logo" className={classes.logo} />
                    <span className={classes.logoText}>i</span>
                    <span className={`${classes.logoText} ${classes.logoTextSpec}`}>S</span>
                    <span className={classes.logoText}>hare</span>
                </div>
                <div className={classes.actionIcons}>
                    <HomeIcon className={classes.icon} style={{ fontSize: '26px' }} />
                    <Badge badgeContent={4} color="secondary" className={classes.icon}>
                        <CommentIcon />
                    </Badge>
                    <Badge badgeContent={19} color="secondary" className={classes.icon}>
                        <FavoriteBorderIcon />
                    </Badge>
                    <Avatar src={avatarViet} alt="avatar" className={classes.avatar} />
                </div>
            </div>
        </div>
    );
};

export default NavBar;
