import React, { useState, useContext, useEffect, useRef } from 'react';
import {
    Dialog,
    DialogTitle,
    IconButton,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Avatar,
} from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/styles';

import { AuthContext, PostContext } from '../../context';

import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import CommentIcon from '@material-ui/icons/Comment';

import { DropzoneArea } from 'material-ui-dropzone';
import PostsProfile from './PostsProfile';
import PostItem from '../Home/PostItem';

const dummyPost = {
    _id: '1',
    userId: {
        name: 'Viet Tran',
        avatarUrl: 'https://i.ibb.co/BPvgb3V/avatar-viet.jpg',
    },
    contentText:
        'this is content of the post. this is content of the post. this is content of the post. this is content of the post',
    postImageUrl: 'http://placekitten.com/400/400',
    numberOfLikes: 14,
    numberOfComments: 9,
    createdAt: '01.04.2020',
};

const useStyles = makeStyles((theme) => ({
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
        ...theme.layouts.container,
        width: '100%',
        padding: '30px 0',
    },
    headerAvatarContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingRight: '20px',

        '&:hover': {
            cursor: 'pointer',
            color: theme.palette.common.colorGreen,
        },
    },
    headerAvatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    headerActionText: {
        marginLeft: '5px',
        fontSize: '14px',
        fontWeight: '500',
    },
    gridContainer: {
        // marginTop: '30px',
        border: `1px solid ${theme.palette.common.colorGreyLight}`,
        minHeight: '100%',
        boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.2)',
    },
    profileList: {
        // backgroundColor: theme.palette.common.colorGreyLight,
        borderRight: `1px solid ${theme.palette.common.colorGreyLight}`,
        padding: 0,
    },
    listItem: {
        backgroundColor: 'red',
        // color: theme.palette.common.colorWhite,
    },
    listItemText: {
        marginLeft: '-15px',
    },
    changeContainer: {
        padding: '20px',
    },
    mainTitle: {
        textAlign: 'center',
        // color: theme.palette.common.colorBlack,
        fontSize: '18px',
        marginBottom: '20px',
        color: theme.palette.common.colorGreen,
        letterSpacing: '1px',
        // textTransform: 'uppercase',
    },
    formControl: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
        width: '100%',
    },
    formLabel: {
        display: 'inline-block',
        width: '120px',
        minWidth: '120px',
        fontSize: '14px',
        textAlign: 'right',
    },
    formInput: {
        marginLeft: '15px',
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
    formActions: {
        display: 'flex',
        justifyContent: 'flex-end',
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
    dropzone: {
        marginLeft: '15px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        textAlign: 'center',
        width: theme.spacing(14),
        height: theme.spacing(14),
    },
    errorMessage: {
        fontSize: '12px',
        color: theme.palette.common.colorRed,
        padding: 0,
        marginLeft: '135px',
        marginBottom: '15px',
    },
}));

const EditProfile = ({
    isEditProfileOpen,
    handleEditProfileClose,
    isListSelected,
    setIsListSelected,
    userData,
}) => {
    const classes = useStyles();
    const theme = useTheme();

    const { token, userId } = useContext(AuthContext);
    const {
        fetchEditUserInfo,
        fetchUploadImage,
        fetchEditUserPassword,
        fetchPostsByUser,
    } = useContext(PostContext);

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [myPosts, setMyPosts] = useState([]);

    const [isOldPasswordCorrect, setIsOldPasswordCorrect] = useState(true);
    const [isNewPasswordConfirmMatch, setIsNewPasswordConfirmMatch] = useState(true);

    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const cfPasswordRef = useRef();

    // const [isListSelected, setIsListSelected] = useState(0);

    const [imageUpload, setImageUpload] = useState([]);

    const handeChangeImageUpload = (files) => {
        setImageUpload(files);
    };

    const handleListSelected = (val) => {
        setIsListSelected(val);
    };

    const changeInfomationSubmit = async () => {
        console.log('changeInfomationSubmit', name, ' email: ', email);
        try {
            let avatarUrl;

            if (imageUpload[0]) {
                const formData = new FormData();
                formData.append('image', imageUpload[0]);
                avatarUrl = await fetchUploadImage('avatar', formData, token);
            }

            await fetchEditUserInfo(name, email, avatarUrl, token);
        } catch (error) {
            console.log(error);
        }
    };

    const changePasswordSubmit = async () => {
        const oldPassword = oldPasswordRef.current.value;
        const newPassword = newPasswordRef.current.value;
        const cfPassword = cfPasswordRef.current.value;

        const confirm = newPassword.localeCompare(cfPassword);
        let res;
        if (confirm === 0) {
            // new password and confirm password are match
            setIsNewPasswordConfirmMatch(true);
            res = await fetchEditUserPassword(oldPassword, newPassword, token);
            console.log(res.message);
            if (res.message === 'Old password is not correct') {
                setIsOldPasswordCorrect(false);
            } else {
                setIsOldPasswordCorrect(true);
            }
        } else {
            setIsNewPasswordConfirmMatch(false);
        }

        // const res = await fetchEditUserPassword(oldPassword, newPassword, token);
        // console.log('Edit password res', res);
    };

    useEffect(() => {
        setName(userData.name);
        setEmail(userData.email);
        const getMyPosts = async () => {
            const resMyPosts = await fetchPostsByUser(userId, token);
            setMyPosts(resMyPosts);
        };
        getMyPosts();
    }, []);

    console.log('EDIT PROFILE RENDER');

    return (
        <div className={classes.editProfile}>
            {userData && (
                <Dialog open={isEditProfileOpen} onClose={handleEditProfileClose} fullScreen={true}>
                    <DialogTitle
                        id="customized-dialog-title"
                        onClose={handleEditProfileClose}
                        className={classes.dialogTitleWrapper}
                    >
                        <div className={classes.dialogTitle}>
                            <div className={classes.headerAvatarContainer}>
                                <Avatar
                                    src={'http://localhost:5000/' + userData.avatarUrl}
                                    alt="avatar"
                                    className={classes.headerAvatar}
                                />
                                <p className={classes.headerActionText}>{userData.name}</p>
                            </div>

                            <IconButton onClick={handleEditProfileClose}>
                                <CloseIcon style={{ color: 'white' }} />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <div className={classes.container}>
                        <Grid container className={classes.gridContainer}>
                            <Grid item xs={3} className={classes.profileList}>
                                <List style={{ padding: 0 }}>
                                    <ListItem
                                        button
                                        selected={isListSelected === 0}
                                        onClick={() => handleListSelected(0)}
                                        style={
                                            isListSelected === 0
                                                ? {
                                                      backgroundColor:
                                                          theme.palette.common.colorGreen,
                                                      color: theme.palette.common.colorWhite,
                                                  }
                                                : null
                                        }
                                    >
                                        <ListItemIcon>
                                            <PersonIcon
                                                style={
                                                    isListSelected === 0
                                                        ? {
                                                              color:
                                                                  theme.palette.common.colorWhite,
                                                          }
                                                        : null
                                                }
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Change Infomation"
                                            classes={{ root: classes.listItemText }}
                                        />
                                    </ListItem>
                                    <Divider />

                                    <ListItem
                                        button
                                        selected={isListSelected === 1}
                                        onClick={() => handleListSelected(1)}
                                        style={
                                            isListSelected === 1
                                                ? {
                                                      backgroundColor:
                                                          theme.palette.common.colorGreen,
                                                      color: theme.palette.common.colorWhite,
                                                  }
                                                : null
                                        }
                                    >
                                        <ListItemIcon>
                                            <VpnKeyIcon
                                                style={
                                                    isListSelected === 1
                                                        ? {
                                                              color:
                                                                  theme.palette.common.colorWhite,
                                                          }
                                                        : null
                                                }
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Change Password"
                                            classes={{ root: classes.listItemText }}
                                        />
                                    </ListItem>
                                    <Divider />

                                    <ListItem
                                        button
                                        selected={isListSelected === 2}
                                        onClick={() => handleListSelected(2)}
                                        style={
                                            isListSelected === 2
                                                ? {
                                                      backgroundColor:
                                                          theme.palette.common.colorGreen,
                                                      color: theme.palette.common.colorWhite,
                                                  }
                                                : null
                                        }
                                    >
                                        <ListItemIcon>
                                            <AddAPhotoIcon
                                                style={
                                                    isListSelected === 2
                                                        ? {
                                                              color:
                                                                  theme.palette.common.colorWhite,
                                                          }
                                                        : null
                                                }
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="My Posts"
                                            classes={{ root: classes.listItemText }}
                                        />
                                    </ListItem>
                                    <Divider />
                                </List>
                            </Grid>
                            <Grid item xs={9} className={classes.profileDetail}>
                                {/* Change infomation */}
                                {isListSelected === 0 && (
                                    <div className={classes.changeContainer}>
                                        <h2 className={classes.mainTitle}>
                                            Change Your Infomation
                                        </h2>
                                        <div className={classes.formControl}>
                                            <span className={classes.formLabel}>Name</span>
                                            <input
                                                type="text"
                                                className={classes.formInput}
                                                value={name}
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className={classes.formControl}>
                                            <span className={classes.formLabel}>Email</span>
                                            <input
                                                type="email"
                                                className={classes.formInput}
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className={classes.formControl}>
                                            <span
                                                className={classes.formLabel}
                                                style={{ alignSelf: 'flex-start' }}
                                            ></span>
                                            <div className={classes.dropzone}>
                                                <Avatar
                                                    src={
                                                        'http://localhost:5000/' +
                                                        userData.avatarUrl
                                                    }
                                                    alt="current avatar"
                                                    className={classes.avatar}
                                                    style={{ marginBottom: '15px' }}
                                                />
                                                <DropzoneArea
                                                    onChange={handeChangeImageUpload}
                                                    acceptedFiles={['image/*']}
                                                    dropzoneText="Change your avatar image"
                                                    fileLimit={1}
                                                    style={{ fontSize: '11px' }}
                                                />
                                            </div>
                                        </div>
                                        <div className={classes.formActions}>
                                            <button
                                                className={classes.button}
                                                onClick={changeInfomationSubmit}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {/* Change Password */}
                                {isListSelected === 1 && (
                                    <div className={classes.changeContainer}>
                                        <h2 className={classes.mainTitle}>Change Your Password</h2>
                                        <div className={classes.formControl}>
                                            <span className={classes.formLabel}>Old Password</span>

                                            <input
                                                type="password"
                                                className={classes.formInput}
                                                ref={oldPasswordRef}
                                            />
                                        </div>
                                        {!isOldPasswordCorrect && (
                                            <p className={classes.errorMessage}>
                                                Old password is not correct
                                            </p>
                                        )}
                                        <div className={classes.formControl}>
                                            <span className={classes.formLabel}>New Password</span>
                                            <input
                                                type="password"
                                                className={classes.formInput}
                                                ref={newPasswordRef}
                                            />
                                        </div>
                                        <div className={classes.formControl}>
                                            <span className={classes.formLabel}>
                                                Confirm Password
                                            </span>
                                            <input
                                                type="password"
                                                className={classes.formInput}
                                                ref={cfPasswordRef}
                                            />
                                        </div>
                                        {!isNewPasswordConfirmMatch && (
                                            <p className={classes.errorMessage}>
                                                Password does not match
                                            </p>
                                        )}
                                        <div className={classes.formActions}>
                                            <button
                                                className={classes.button}
                                                onClick={changePasswordSubmit}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Posts Profile */}
                                {isListSelected === 2 && (
                                    <div className={classes.changeContainer}>
                                        <h2 className={classes.mainTitle}>
                                            My Posts: {myPosts && myPosts.length}
                                        </h2>
                                        {/* <PostsProfile /> */}
                                        <Grid container spacing={2}>
                                            {myPosts &&
                                                myPosts.map((post) => (
                                                    <Grid item xs={6} key={post._id}>
                                                        <PostItem
                                                            post={post}
                                                            userId={userId}
                                                            token={token}
                                                        />
                                                    </Grid>
                                                ))}
                                        </Grid>
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                    </div>
                    <div
                        style={{ height: '1px', backgroundColor: theme.palette.common.colorGreen }}
                    />
                </Dialog>
            )}
        </div>
    );
};

export default EditProfile;
