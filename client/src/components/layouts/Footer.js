import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    container: {
        ...theme.layouts.container,
        padding: '30px 0',
        borderTop: `1px solid ${theme.palette.common.colorGreyLight}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.container}>
            <p>Copyright &copy; {new Date().getFullYear()} by Viet Tran and Long Nguyen</p>
        </footer>
    );
};

export default Footer;
