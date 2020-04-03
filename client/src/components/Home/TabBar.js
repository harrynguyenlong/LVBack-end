import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    container: {
        ...theme.layouts.container,
        display: 'flex',
        justifyContent: 'center',
        height: '50px'
        // background: 'grey'
    },
    tab: {
        margin: theme.spacing(1)
    }
}));

const TabBar = () => {
    const classes = useStyles();
    const [tabValue, setTabValue] = useState(0);
    // const pathname = window.location.pathname;
    // useEffect(() => {
    //     switch (pathname) {
    //         case '/':
    //             if (tabValue !== 0) {
    //                 setTabValue(0);
    //             }
    //             break;
    //         case '/top-comments':
    //             if (tabValue !== 1) {
    //                 setTabValue(1);
    //             }
    //             break;
    //         case '/top-likes':
    //             if (tabValue !== 2) {
    //                 setTabValue(2);
    //             }
    //             break;

    //         default:
    //             break;
    //     }
    // }, [tabValue, pathname, setTabValue]);

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
