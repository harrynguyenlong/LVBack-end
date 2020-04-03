import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Tabs, Tab, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    container: {
        ...theme.layouts.container,
        display: 'flex',
        justifyContent: 'center',
        height: '50px'
        // position: 'relative'
    },
    tab: {
        margin: theme.spacing(1)
    }
}));

const TabBar = () => {
    const classes = useStyles();
    const [tabValue, setTabValue] = useState(0);

    return (
        <div className={classes.container}>
            <Tabs
                indicatorColor="primary"
                centered
                textColor="primary"
                value={tabValue}
                onChange={(event, newValue) => setTabValue(newValue)}
            >
                <Tab label="Newest" />
                <Tab label="Top Comments" />
                <Tab label="Top Likes" />
            </Tabs>
        </div>
    );
};

export default TabBar;
