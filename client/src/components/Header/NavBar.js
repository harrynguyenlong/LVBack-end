import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Badge } from '@material-ui/core';

import logo from '../../assets/images/iShare-logo1.png';
import avatarViet from '../../assets/images/avatar-viet.jpg';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import CommentIcon from '@material-ui/icons/Comment';
// import HomeIcon from '@material-ui/icons/Home';

import { UIContext, AuthContext } from '../../context';

import LoginRegisterForm from '../LoginRegister/LoginRegisterForm';

const useStyles = makeStyles((theme) => ({
    navbar: {
        height: '54px',
        borderBottom: `1px solid ${theme.palette.common.colorGreyLight}`,
        backgroundColor: theme.palette.common.colorWhite,
    },
    container: {
        ...theme.layouts.container,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logoContainer: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    logo: {
        display: 'inline-block',
        height: '60%',
        marginRight: '5px',
    },
    logoText: {
        fontSize: '24px',
        fontWeight: 700,
        color: theme.palette.common.colorBlack,
        letterSpacing: '2px',
    },
    logoTextSpec: {
        fontWeight: '900',
        color: theme.palette.common.colorGreen,
    },
    actionIcons: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        fontSize: '24px',
        marginRight: '32px',
        color: theme.palette.common.colorBlack,
    },
    avatarContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingRight: '20px',
        borderRight: `1px solid ${theme.palette.common.colorGreyLight}`,
        '&:hover': {
            cursor: 'pointer',
            color: theme.palette.common.colorGreen,
        },
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    actionText: {
        marginLeft: '5px',
        fontSize: '14px',
        fontWeight: '500',
    },
    authContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '20px',
        '&:hover': {
            cursor: 'pointer',
            color: theme.palette.common.colorGreen,
        },
    },
}));

const NavBar = () => {
    const classes = useStyles();
    const { setTabValue } = useContext(UIContext);
    const { user, token, login, logout } = useContext(AuthContext);
    const [loginOpen, setLoginOpen] = useState(false);

    const handleLoginClose = () => {
        setLoginOpen(false);
    };

    // console.log('navbar', user, token);
    return (
        <div className={classes.navbar}>
            <div className={classes.container}>
                <div
                    className={classes.logoContainer}
                    onClick={() => {
                        setTabValue(0);
                    }}
                >
                    <img src={logo} alt="logo" className={classes.logo} />
                    <span className={classes.logoText}>i</span>
                    <span className={`${classes.logoText} ${classes.logoTextSpec}`}>S</span>
                    <span className={classes.logoText}>hare</span>
                </div>
                <div className={classes.actionIcons}>
                    {/* <HomeIcon className={classes.icon} style={{ fontSize: '26px' }} />
                    <Badge badgeContent={4} color="secondary" className={classes.icon}>
                        <CommentIcon />
                    </Badge>
                    <Badge badgeContent={19} color="secondary" className={classes.icon}>
                        <FavoriteBorderIcon />
                    </Badge> */}
                    {token && user && (
                        <React.Fragment>
                            <div className={classes.avatarContainer}>
                                <Avatar
                                    src={user.avatarUrl}
                                    alt="avatar"
                                    className={classes.avatar}
                                />
                                <p className={classes.actionText}>{user.name}</p>
                            </div>
                            <div className={classes.authContainer} onClick={() => logout()}>
                                <ExitToAppIcon />
                                <p className={classes.actionText}>Logout</p>
                            </div>
                        </React.Fragment>
                    )}
                    {!token && (
                        <div
                            className={classes.authContainer}
                            // onClick={() => login('this is dummy token', '5e89d609098dcb277f87d1ed')}
                            onClick={() => setLoginOpen(true)}
                        >
                            <LockOpenIcon />
                            <p className={classes.actionText}>Login</p>
                        </div>
                    )}
                </div>
            </div>
            <LoginRegisterForm loginOpen={loginOpen} handleLoginClose={handleLoginClose} />
        </div>
    );
};

export default NavBar;
