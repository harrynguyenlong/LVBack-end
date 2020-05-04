import React, { useState, useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Dialog, DialogTitle, IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';

// import { DropzoneArea } from 'material-ui-dropzone';
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
    registerError: {
        ...theme.shared.errorInfo,
    },
}));

const LoginRegisterForm = ({ loginOpen, handleLoginClose }) => {
    const classes = useStyles();
    const { login } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [showErrorText, setShowErrorText] = useState(false);

    // const [imageUpload, setImageUpload] = useState([]);

    const emailLoginRef = useRef();
    const passwordLoginRef = useRef();

    const emailSignUpRef = useRef(null);
    const passwordSignUpRef = useRef(null);
    const confirmedPasswordSignUpRef = useRef(null);
    const nameSignUpRef = useRef(null);

    const [isErrorEmailExist, setIsErrorEmailExist] = useState(true);
    const [isErrorPasswordNotMatch, setErrorPasswordNotMatch] = useState(true);

    const handleToggleLogin = () => {
        setIsLogin((isLogin) => !isLogin);
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            let email = emailSignUpRef.current.value;
            let name = nameSignUpRef.current.value;
            let password = passwordSignUpRef.current.value;
            let confirmedPassword = confirmedPasswordSignUpRef.current.value;

            const confirm = password.localeCompare(confirmedPassword);
            if (confirm === 0) {
                const requestBody = {
                    query: `
                    mutation {
                        createUser(name: "${name}", password:"${password}", email:"${email}") {
                            token 
                            userId
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

                let resp = await postRes.json();

                console.log('add user', resp);

                if (resp.data.createUser.message === 'email already exists') {
                    setIsErrorEmailExist(false);
                    return;
                }

                if (resp.data.createUser.token && resp.data.createUser.userId) {
                    login(resp.data.createUser.token, resp.data.createUser.userId);
                }

                handleLoginClose();
            } else {
                // Show that the password mismatch?
                setErrorPasswordNotMatch(false);
                return;
            }
        } catch (error) {
            console.log('error');
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
                                    id="email_login"
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
                                    id="password_login"
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
                            {!isErrorEmailExist && (
                                <p className={classes.errorInfo}>This email already exists</p>
                            )}
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
                            {!isErrorPasswordNotMatch && (
                                <p className={classes.errorInfo}>Password not match</p>
                            )}

                            <button
                                className={classes.button}
                                onClick={(event) => {
                                    handleSignUp(event);
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
