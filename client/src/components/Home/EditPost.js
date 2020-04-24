import React, { useState, useRef, useContext, useEffect } from 'react';
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
        margin: '20px 0',
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
    image: {
        display: 'block',
        width: '100%',
        marginTop: '10px',
    },
}));

const EditPost = ({ isEditPost, handleEditPostClose, post }) => {
    const classes = useStyles();
    const { token, userId } = useContext(AuthContext);
    const { addPost, fetchUser, fetchEditPost, fetchUploadImage } = useContext(PostContext);
    const [imageUpload, setImageUpload] = useState([]);
    const [content, setContent] = useState('');
    const contentTextRef = useRef();

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
            let postImageUrl;
            console.log();
            console.log(imageUpload[0]);
            if (imageUpload[0]) {
                const formData = new FormData();
                formData.append('image', imageUpload[0]);
                postImageUrl = await fetchUploadImage(formData, token);
                console.log(postImageUrl);
            }

            await fetchEditPost(post._id, contentText, postImageUrl, token);
            handleEditPostClose();

            // const imageRes = await fetch('http://localhost:5000/upload-image', {
            //     method: 'POST',
            //     headers: {
            //         Authorization: 'Bearer ' + token,
            //     },
            //     body: formData,
            // });

            // if (imageRes.status !== 200 && imageRes.status !== 201) {
            //     // console.log('upload image error');
            //     setIsSnackbarOpen(true);
            //     return;
            // }

            // const imageResData = await imageRes.json();

            // const requestBody = {
            //     query: `
            //         mutation {
            //             createPost(
            //                 contentText: "${contentTextRef.current.value}",
            //                 postImageUrl: "${imageResData.filePath}"
            //             ) {
            //                 _id
            //                 userId{
            //                     _id
            //                     name
            //                     avatarUrl
            //                     roles
            //                 }
            //                 contentText
            //                 postImageUrl
            //                 numberOfLikes
            //                 numberOfComments
            //                 createdAt
            //                 isLiked
            //             }
            //         }
            //     `,
            // };

            // const postRes = await fetch('http://localhost:5000/graphql', {
            //     method: 'POST',
            //     body: JSON.stringify(requestBody),
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Authorization: 'Bearer ' + token,
            //     },
            // });

            // if (postRes.status !== 200 && postRes.status !== 201) {
            //     // console.log('post error');
            //     setIsSnackbarOpen(true);
            //     return;
            // }

            // const postResData = await postRes.json();
            // console.log('addpost', postResData.data.createPost);
            // addPost(postResData.data.createPost);
            // fetchUser(userId, token);
            // handleEditPostClose();
        } catch (error) {
            console.log(error);
            setIsSnackbarOpen(true);
        }
    };

    useEffect(() => {
        setContent(post.contentText);
    }, []);

    console.log('EDIT POST RENDER', post);
    return (
        <div className={classes.postForm}>
            <Dialog
                open={isEditPost}
                onClose={handleEditPostClose}
                aria-labelledby="customized-dialog-title"
            >
                {post && (
                    <form onSubmit={handleSubmit}>
                        <DialogTitle
                            id="customized-dialog-title"
                            onClose={handleEditPostClose}
                            className={classes.dialogTitleWrapper}
                        >
                            <div className={classes.dialogTitle}>
                                <Typography style={{ fontWeight: '500' }}>Edit Post</Typography>

                                <IconButton onClick={handleEditPostClose}>
                                    <CloseIcon style={{ color: 'white' }} />
                                </IconButton>
                            </div>
                        </DialogTitle>
                        <DialogContent dividers style={{ minWidth: '600px' }}>
                            {/* <TextField
                            autoFocus
                            multiline
                            rows="4"
                            name="content"
                            label="Content"
                            variant="outlined"
                            style={{ width: '100%' }}
                            ref={contentTextRef}
                        /> */}
                            <textarea
                                ref={contentTextRef}
                                row={4}
                                placeholder="The text content"
                                className={classes.contentText}
                                value={content}
                                onChange={(e) => {
                                    setContent(e.target.value);
                                }}
                            />
                            <img
                                src={`http://localhost:5000/${post.postImageUrl}`}
                                alt="image"
                                className={classes.image}
                            />
                            <div className={classes.dropzone}>
                                <DropzoneArea
                                    onChange={handeChangeImageUpload}
                                    acceptedFiles={['image/*']}
                                    fileLimit={1}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions style={{ padding: '15px 0' }}>
                            <button className={classes.button} onClick={handleEditPostClose}>
                                Cancel
                            </button>
                            <button type="submit" className={classes.button}>
                                Save
                            </button>
                        </DialogActions>
                    </form>
                )}
            </Dialog>
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
        </div>
    );
};

export default EditPost;
