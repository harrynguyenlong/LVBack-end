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
    MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { DropzoneArea } from 'material-ui-dropzone';

const useStyles = makeStyles(theme => ({
    postForm: {
        // width: '80vw',
        // height: '80vh',
        display: 'none'
    },
    dropzone: {
        margin: '20px 0'
    },
    button: {
        ...theme.shared.btn,
        marginRight: '25px',
        '&:hover': {
            ...theme.shared.btnHover
        },
        '&:active': {
            ...theme.shared.btnActive
        }
    }
}));

const PostForm = ({ isPostFormOpen, handlePostFormClose }) => {
    const classes = useStyles();
    const [imageUpload, setImageUpload] = useState([]);

    const handeChangeImageUpload = files => {
        setImageUpload(files);
    };

    return (
        <div className={classes.postForm}>
            <Dialog
                open={isPostFormOpen}
                onClose={handlePostFormClose}
                aria-labelledby="customized-dialog-title"
            >
                <DialogTitle id="customized-dialog-title" onClose={handlePostFormClose}>
                    Create New Post
                </DialogTitle>
                <DialogContent dividers style={{ minWidth: '600px' }}>
                    <DialogContentText>Please fill out the form below</DialogContentText>
                    <TextField
                        autoFocus
                        multiline
                        rows="4"
                        name="content"
                        label="Content"
                        variant="outlined"
                        style={{ width: '100%' }}
                    />
                    <div className={classes.dropzone}>
                        <DropzoneArea
                            onChange={handeChangeImageUpload}
                            acceptedFiles={['image/*']}
                        />
                    </div>
                </DialogContent>
                <DialogActions style={{ padding: '15px 0' }}>
                    <button className={classes.button} onClick={handlePostFormClose}>
                        Cancel
                    </button>
                    <button className={classes.button} onClick={handlePostFormClose}>
                        Post
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PostForm;
