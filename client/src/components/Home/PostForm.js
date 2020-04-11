import React, { useState, useRef } from 'react';
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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import { DropzoneArea } from 'material-ui-dropzone';

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
}));

const PostForm = ({ isPostFormOpen, handlePostFormClose }) => {
    const classes = useStyles();
    const [imageUpload, setImageUpload] = useState([]);
    const contentTextRef = useRef();

    const handeChangeImageUpload = (files) => {
        setImageUpload(files);
        console.log(files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submited...');
        console.log('content text:', contentTextRef.current.value);
        console.log('image upload', imageUpload);
        const formData = new FormData();
        formData.append('contentText', contentTextRef.current.value);
        formData.append('postImageUrl', imageUpload[0]);

        console.log('form data', formData);

        // const requestBody = {
        //     query: `
        //         mutation {
        //             createPost(
        //                 contentText:
        //             )
        //         }
        //     `
        // }
    };

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
                        <button className={classes.button} onClick={handlePostFormClose}>
                            Cancel
                        </button>
                        <button type="submit" className={classes.button}>
                            Post
                        </button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default PostForm;
