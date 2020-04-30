import React, { useState, useRef, useContext } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography,
    Snackbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import { DropzoneArea } from 'material-ui-dropzone';
import { AuthContext, PostContext } from '../../context';

const useStyles = makeStyles((theme) => ({
    postForm: {
        // width: '80vw',
        // height: '80vh',
        display: 'none',
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
    contentText: {
        width: '100%',
        maxWidth: '100%',
        minWidth: '100%',
        height: '50px',
        minHeight: '50px',
        outline: 'none',
        fontSize: '14px',
        paddingLeft: '6px',
        paddingTop: '4px',
        borderRadius: '5px',
        border: `1px solid ${theme.palette.common.colorGreyLight}`,
        background: theme.palette.common.colorLightBg,
        '&:focus': {
            border: `1px solid ${theme.palette.common.colorGreen}`,
        },
    },
    dropzone: {
        marginTop: '20px',
    },
    button: {
        ...theme.shared.btn,
        marginRight: '25px',
        '&:hover': {
            ...theme.shared.btnHover,
        },
        '&:active': {
            ...theme.shared.btnActive,
        },
    },
    validateError: {
        color: theme.palette.common.colorRed,
        fontSize: '12px',
        marginTop: '5px',
    },
}));

const PostForm = ({ isPostFormOpen, handlePostFormClose }) => {
    const classes = useStyles();
    const { token, userId } = useContext(AuthContext);
    const { fetchAddPost, fetchUploadImage, fetchUser } = useContext(PostContext);
    const [imageUpload, setImageUpload] = useState([]);
    const contentTextRef = useRef();

    const [contentValidate, setContentValidate] = useState(true);
    const [imageValidate, setImageValidate] = useState(true);

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    const handeChangeImageUpload = (files) => {
        setImageUpload(files);
        // console.log(files);
    };

    const handleSnackbarClose = () => {
        setIsSnackbarOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const contentText = contentTextRef.current.value;
            if (contentText.length >= 3 && contentText.length < 500) {
                setContentValidate(true);
            } else {
                setContentValidate(false);
                return;
            }

            if (!imageUpload[0]) {
                setImageValidate(false);
                return;
            } else {
                setImageValidate(true);
            }

            const formData = new FormData();
            formData.append('image', imageUpload[0]);

            const postImageUrl = await fetchUploadImage(formData, token, 'post');

            await fetchAddPost(contentText, postImageUrl, token);

            fetchUser(userId, token);
            handlePostFormClose();
        } catch (error) {
            // console.log('POST FORM ERROR', error);
            setIsSnackbarOpen(true);
        }
    };

    console.log('POSTFORM RENDER');
    return (
        <div className={classes.postForm}>
            <Dialog
                open={isPostFormOpen}
                onClose={handlePostFormClose}
                aria-labelledby="customized-dialog-title"
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle
                        id="customized-dialog-title"
                        onClose={handlePostFormClose}
                        className={classes.dialogTitleWrapper}
                    >
                        <div className={classes.dialogTitle}>
                            <Typography style={{ fontWeight: '500' }}>Create New Post</Typography>

                            <IconButton onClick={handlePostFormClose}>
                                <CloseIcon style={{ color: 'white' }} />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers style={{ minWidth: '600px' }}>
                        <textarea
                            ref={contentTextRef}
                            row={4}
                            placeholder="The text content"
                            className={classes.contentText}
                        />
                        {!contentValidate && (
                            <p className={classes.validateError}>
                                Content must be at least 3 characters and max 500 characters
                            </p>
                        )}
                        <div className={classes.dropzone}>
                            <DropzoneArea
                                onChange={handeChangeImageUpload}
                                acceptedFiles={['image/*']}
                                fileLimit={1}
                            />
                        </div>
                        {!imageValidate && (
                            <p className={classes.validateError}>Image must be require</p>
                        )}
                    </DialogContent>
                    <DialogActions style={{ padding: '15px 0' }}>
                        <button className={classes.button} onClick={handlePostFormClose}>
                            Cancel
                        </button>
                        <button type="submit" className={classes.button}>
                            Post
                        </button>
                    </DialogActions>
                </form>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={isSnackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message="Something went wrong, please try again"
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleSnackbarClose}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                />
            </Dialog>
        </div>
    );
};

export default PostForm;
