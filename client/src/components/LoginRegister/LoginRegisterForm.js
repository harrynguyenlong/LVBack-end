import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Avatar,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';

import { DropzoneArea } from 'material-ui-dropzone';
import { AuthContext } from '../../context';

const useStyles = makeStyles((theme) => ({
    dialog: {
        maxWidth: '80vw',
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
    container: {
        width: '300px',
        padding: '10px 20px 20px 20px',
    },
    loginIcon: {
        fontSize: '50px',
        color: theme.palette.common.colorGreen,
        border: `1px solid ${theme.palette.common.colorGreen}`,
        borderRadius: '50%',
        padding: '5px',
    },
    formControl: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
    },
    formLabel: {
        display: 'inline-block',
        width: '65px',
        minWidth: '65px',
        fontSize: '14px',
        textAlign: 'right',
    },
    formInput: {
        // marginLeft: '15px',
        width: '100%',

        height: '30px',
        outline: 'none',
        fontSize: '14px',
        paddingLeft: '6px',
        borderRadius: '5px',
        border: `1px solid ${theme.palette.common.colorGreyLight}`,
        background: theme.palette.common.colorLightBg,
        '&:focus': {
            border: `1px solid ${theme.palette.common.colorGreen}`,
        },
    },
    button: {
        ...theme.shared.btn,
        width: '100%',
        '&:hover': {
            ...theme.shared.btnHover,
        },
        '&:active': {
            ...theme.shared.btnActive,
        },
    },
    toggleLoginRegister: {
        textAlign: 'center',
        marginTop: '20px',
        cursor: 'pointer',
        fontSize: '14px',
        color: theme.palette.common.colorBlack,
        '&:hover': {
            color: theme.palette.common.colorGreen,
        },
    },
    dropzone: {
        fontSize: '10px',
    },
}));

const LoginRegisterForm = ({ loginOpen, handleLoginClose }) => {
    const classes = useStyles();
    const { token, userId, login } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);

    const [imageUpload, setImageUpload] = useState([]);

    const handeChangeImageUpload = (files) => {
        setImageUpload(files);
    };

    const handleToggleLogin = () => {
        setIsLogin((isLogin) => !isLogin);
    };

    return (
        <div className={classes.loginRegisterForm}>
            <Dialog
                open={loginOpen}
                onClose={handleLoginClose}
                classes={{ paperFullWidth: classes.dialog }}
            >
                <DialogTitle
                    id="customized-dialog-title"
                    onClose={handleLoginClose}
                    className={classes.dialogTitleWrapper}
                >
                    <div className={classes.dialogTitle}>
                        {isLogin ? 'Login' : 'Create New Account'}

                        <IconButton onClick={handleLoginClose}>
                            <CloseIcon style={{ color: 'white' }} />
                        </IconButton>
                    </div>
                </DialogTitle>
                <div className={classes.container}>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                        <PersonIcon className={classes.loginIcon} />
                    </div>
                    {isLogin && (
                        <div className={classes.loginForm}>
                            <div className={classes.formControl}>
                                {/* <span className={classes.formLabel}>Email</span> */}
                                <input
                                    type="email"
                                    className={classes.formInput}
                                    // value="Viet Tran"
                                    // onChange={() => {}}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className={classes.formControl}>
                                {/* <span className={classes.formLabel}>Password</span> */}
                                <input
                                    type="password"
                                    className={classes.formInput}
                                    // value="Viet Tran"
                                    // onChange={() => {}}
                                    placeholder="Enter your password"
                                />
                            </div>
                            <button
                                className={classes.button}
                                onClick={() => {
                                    const token =
                                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTMxNDU4OTA4MTJmM2UwYmJhOGZjNiIsImVtYWlsIjoia2l0QGtpdC5maSIsIm5hbWUiOiJLaXQiLCJpYXQiOjE1ODY3MDIxNzN9.an8zU1z2TOEnguwlPy7Cexc9dLZJ8KWBFPSDvx2-0XQ';
                                    const user = {
                                        userId: '5e93145890812f3e0bba8fc6',
                                        name: 'Kit',
                                        avatarUrl: '',
                                    };
                                    login(token, user);
                                    handleLoginClose();
                                }}
                            >
                                Login
                            </button>
                        </div>
                    )}

                    {!isLogin && (
                        <div className={classes.registerForm}>
                            <div className={classes.formControl}>
                                <input
                                    type="text"
                                    className={classes.formInput}
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className={classes.formControl}>
                                <input
                                    type="email"
                                    className={classes.formInput}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className={classes.formControl}>
                                <input
                                    type="password"
                                    className={classes.formInput}
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div className={classes.formControl}>
                                <input
                                    type="password"
                                    className={classes.formInput}
                                    placeholder="Confirm your password"
                                />
                            </div>
                            <div className={classes.formControl}>
                                <DropzoneArea
                                    onChange={handeChangeImageUpload}
                                    acceptedFiles={['image/*']}
                                    dropzoneText="Select avatar image"
                                    fileLimit={1}
                                    style={{ fontSize: '11px' }}
                                    dropzoneClass={classes.dropzone}
                                />
                            </div>
                            <button
                                className={classes.button}
                                onClick={() => {
                                    login('this is dummy token', '5e89d609098dcb277f87d1ed');
                                    handleLoginClose();
                                }}
                            >
                                Create New Account
                            </button>
                        </div>
                    )}

                    <p className={classes.toggleLoginRegister} onClick={() => handleToggleLogin()}>
                        {isLogin ? (
                            <span>
                                Create new account <span>&#8594;</span>
                            </span>
                        ) : (
                            <span>&#8592; Back to Login</span>
                        )}
                    </p>
                </div>
            </Dialog>
        </div>
    );
};

export default LoginRegisterForm;
