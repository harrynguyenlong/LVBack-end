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

    const handeChangeImageUpload = (files) => {
        setImageUpload(files);
    };

    return (
        <div className={classes.postForm}>
            <Dialog
                open={isPostFormOpen}
                onClose={handlePostFormClose}
                aria-labelledby="customized-dialog-title"
            >
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
                    {/* <DialogContentText>Please fill out the form below</DialogContentText> */}
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
