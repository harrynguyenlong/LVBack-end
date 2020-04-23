import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
import { Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { UIContext } from '../../context';

const useStyles = makeStyles((theme) => ({
    container: {
        ...theme.layouts.container,
        display: 'flex',
        justifyContent: 'center',
        height: '50px',
        marginTop: '5px',
        // position: 'relative'
    },
    tab: {
        margin: theme.spacing(1),
    },
}));

const TabBar = () => {
    const classes = useStyles();
    const { tabValue, setTabValue } = useContext(UIContext);
    console.log('TABBAR RENDER');
    return (
        <div className={classes.container}>
            <Tabs
                indicatorColor="primary"
                centered
                textColor="primary"
                value={tabValue}
                onChange={(newValue) => setTabValue(newValue)}
            >
                <Tab label="Newest" />
                <Tab label="Top Comments" />
                <Tab label="Top Likes" />
            </Tabs>
        </div>
    );
};

export default TabBar;
