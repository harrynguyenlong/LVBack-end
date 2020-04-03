import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({}));

const Button = ({ title, onClick }) => {
    const classes = useStyles();
    return <button onClick={onClick}>{title}</button>;
};

export default Button;
