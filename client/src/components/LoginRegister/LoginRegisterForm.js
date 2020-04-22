import React, { useState, useContext, useRef } from 'react';
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
    errorInfo: {
        ...theme.shared.errorInfo,
    },
}));

const LoginRegisterForm = ({ loginOpen, handleLoginClose }) => {
    const classes = useStyles();
    const { token, userId, login } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [showErrorText, setShowErrorText] = useState(false);

    const [imageUpload, setImageUpload] = useState([]);

    const emailLoginRef = useRef();
    const passwordLoginRef = useRef();

    const emailSignUpRef = useRef(null);
    const passwordSignUpRef = useRef(null);
    const confirmedPasswordSignUpRef = useRef(null);
    const nameSignUpRef = useRef(null);

    const handeChangeImageUpload = (files) => {
        setImageUpload(files);
    };

    const handleToggleLogin = () => {
        setIsLogin((isLogin) => !isLogin);
    };

    const handleSignUp = async (event) => {
        event.preventDefault();

        let email = emailSignUpRef.current.value;
        let name = nameSignUpRef.current.value;
        let password = passwordSignUpRef.current.value;
        let confirmedPassword = passwordSignUpRef.current.value;

        if (password === confirmedPassword) {
            const requestBody = {
                query: `
                    mutation {
                        createUser(name: "${name}", password:"${password}", email:"${email}") {
                            token 
                            message
                        }
                    }
                `,
            };
    
            const postRes = await fetch('http://localhost:5000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!(postRes.status >= 200 && postRes.status <= 201)) {
                // Some error happend - Show banner?
                return;
            }

            let resp = await postRes.json()

            login(resp.data.createUser.token, resp.data.createUser.userId);

            let uploadResp = await handleUploadProfilePicture(resp.data.createUser.token);

            handleLoginClose();
        } else {
            // Show that the password mismatch?
        }
    };

    const handleUploadProfilePicture = async (token) => {
        const formData = new FormData();
        formData.append('image', imageUpload[0]);

        const imageRes = await fetch('http://localhost:5000/upload-image', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: formData,
        });

        if ((imageRes.status >= 200 && imageRes.status <= 201)) {
            return true;
        } else {
            return false;
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const email = emailLoginRef.current.value;
        const password = passwordLoginRef.current.value;

        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.status !== 200 && response.status !== 201) {
            setShowErrorText(true);
            return;
        }

        const responseData = await response.json();
        const token = responseData.token;
        const userId = responseData.userId;

        // console.log(token, user);

        if (!token || !userId) {
            throw new Error('Something went wrong');
        }

        login(token, userId);
        handleLoginClose();
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
                                    id='email_login'
                                    placeholder="Enter your email"
                                    ref={emailLoginRef}
                                />
                            </div>
                            <div className={classes.formControl}>
                                {/* <span className={classes.formLabel}>Password</span> */}
                                <input
                                    type="password"
                                    className={classes.formInput}
                                    // value="Viet Tran"
                                    // onChange={() => {}}
                                    id='password_login'
                                    placeholder="Enter your password"
                                    ref={passwordLoginRef}
                                />
                            </div>
                            {showErrorText && (
                                <p className={classes.errorInfo}>
                                    Your email or password is not correct.
                                </p>
                            )}
                            <button
                                className={classes.button}
                                onClick={(event) => {
                                    // const token =
                                    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTMxNDU4OTA4MTJmM2UwYmJhOGZjNiIsImVtYWlsIjoia2l0QGtpdC5maSIsIm5hbWUiOiJLaXQiLCJpYXQiOjE1ODY3MDIxNzN9.an8zU1z2TOEnguwlPy7Cexc9dLZJ8KWBFPSDvx2-0XQ';
                                    // const user = {
                                    //     userId: '5e93145890812f3e0bba8fc6',
                                    //     name: 'Kit',
                                    //     avatarUrl: '',
                                    // };
                                    // login(token, user);
                                    handleLogin(event);
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
                                    ref={nameSignUpRef}
                                />
                            </div>
                            <div className={classes.formControl}>
                                <input
                                    type="email"
                                    className={classes.formInput}
                                    placeholder="Enter your email"
                                    ref={emailSignUpRef}
                                />
                            </div>
                            <div className={classes.formControl}>
                                <input
                                    type="password"
                                    className={classes.formInput}
                                    placeholder="Enter your password"
                                    ref={passwordSignUpRef}
                                />
                            </div>
                            <div className={classes.formControl}>
                                <input
                                    type="password"
                                    className={classes.formInput}
                                    placeholder="Confirm your password"
                                    ref={confirmedPasswordSignUpRef}
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
                                onClick={(event) => {
                                    handleSignUp(event);
                                    // login('this is dummy token', '5e89d609098dcb277f87d1ed');
                                    // handleLoginClose();
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
