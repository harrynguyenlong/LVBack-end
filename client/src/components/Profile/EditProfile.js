import React, { useState } from 'react';
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

import { makeStyles, useTheme } from '@material-ui/styles';

import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';

import { DropzoneArea } from 'material-ui-dropzone';

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
        color: theme.palette.common.colorBlack,
        fontSize: '18px',
        marginBottom: '20px',
        color: theme.palette.common.colorGreen,
        letterSpacing: '1px',
    },
    formControl: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
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
}));

const EditProfile = ({ isEditProfileOpen, handleEditProfileClose }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [isListSelected, setIsListSelected] = useState(0);

    const [imageUpload, setImageUpload] = useState([]);

    const handeChangeImageUpload = (files) => {
        setImageUpload(files);
    };

    const handleListSelected = (val) => {
        setIsListSelected(val);
    };

    return (
        <div className={classes.editProfile}>
            <Dialog open={isEditProfileOpen} onClose={handleEditProfileClose} fullScreen={true}>
                <DialogTitle
                    id="customized-dialog-title"
                    onClose={handleEditProfileClose}
                    className={classes.dialogTitleWrapper}
                >
                    <div className={classes.dialogTitle}>
                        <Typography style={{ fontWeight: '500' }}>Edit Profile</Typography>

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
                                                  backgroundColor: theme.palette.common.colorGreen,
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
                                                          color: theme.palette.common.colorWhite,
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
                                                  backgroundColor: theme.palette.common.colorGreen,
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
                                                          color: theme.palette.common.colorWhite,
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
                                                  backgroundColor: theme.palette.common.colorGreen,
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
                                                          color: theme.palette.common.colorWhite,
                                                      }
                                                    : null
                                            }
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Posts"
                                        classes={{ root: classes.listItemText }}
                                    />
                                </ListItem>
                                <Divider />

                                <ListItem
                                    button
                                    selected={isListSelected === 3}
                                    onClick={() => handleListSelected(3)}
                                    style={
                                        isListSelected === 3
                                            ? {
                                                  backgroundColor: theme.palette.common.colorGreen,
                                                  color: theme.palette.common.colorWhite,
                                              }
                                            : null
                                    }
                                >
                                    <ListItemIcon>
                                        <CommentIcon
                                            style={
                                                isListSelected === 3
                                                    ? {
                                                          color: theme.palette.common.colorWhite,
                                                      }
                                                    : null
                                            }
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Comments"
                                        classes={{ root: classes.listItemText }}
                                    />
                                </ListItem>
                                <Divider />

                                <ListItem
                                    button
                                    selected={isListSelected === 4}
                                    onClick={() => handleListSelected(4)}
                                    style={
                                        isListSelected === 4
                                            ? {
                                                  backgroundColor: theme.palette.common.colorGreen,
                                                  color: theme.palette.common.colorWhite,
                                              }
                                            : null
                                    }
                                >
                                    <ListItemIcon>
                                        <FavoriteIcon
                                            style={
                                                isListSelected === 4
                                                    ? {
                                                          color: theme.palette.common.colorWhite,
                                                      }
                                                    : null
                                            }
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Likes"
                                        classes={{ root: classes.listItemText }}
                                    />
                                </ListItem>
                                <Divider />
                            </List>
                        </Grid>
                        <Grid item xs={9} className={classes.profileDetail}>
                            {isListSelected === 0 && (
                                <div className={classes.changeContainer}>
                                    <h2 className={classes.mainTitle}>Change Your Infomation</h2>
                                    <div className={classes.formControl}>
                                        <span className={classes.formLabel}>Name</span>
                                        <input
                                            type="text"
                                            className={classes.formInput}
                                            value="Viet Tran"
                                            onChange={() => {}}
                                        />
                                    </div>
                                    <div className={classes.formControl}>
                                        <span className={classes.formLabel}>Email</span>
                                        <input
                                            type="email"
                                            className={classes.formInput}
                                            value="viet@viet.fi"
                                            onChange={() => {}}
                                        />
                                    </div>
                                    <div className={classes.formControl}>
                                        <span
                                            className={classes.formLabel}
                                            style={{ alignSelf: 'flex-start' }}
                                        ></span>
                                        <div className={classes.dropzone}>
                                            <Avatar
                                                src={'https://i.ibb.co/BPvgb3V/avatar-viet.jpg'}
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
                                        <button className={classes.button}>Save</button>
                                    </div>
                                </div>
                            )}
                            {isListSelected === 1 && (
                                <div className={classes.changeContainer}>
                                    <h2 className={classes.mainTitle}>Change Your Password</h2>
                                    <div className={classes.formControl}>
                                        <span className={classes.formLabel}>Old Password</span>
                                        <input type="password" className={classes.formInput} />
                                    </div>
                                    <div className={classes.formControl}>
                                        <span className={classes.formLabel}>New Password</span>
                                        <input type="password" className={classes.formInput} />
                                    </div>
                                    <div className={classes.formControl}>
                                        <span className={classes.formLabel}>Confirm Password</span>
                                        <input type="password" className={classes.formInput} />
                                    </div>
                                    <div className={classes.formActions}>
                                        <button className={classes.button}>Save</button>
                                    </div>
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </div>
                <div style={{ height: '1px', backgroundColor: theme.palette.common.colorGreen }} />
            </Dialog>
        </div>
    );
};

export default EditProfile;
