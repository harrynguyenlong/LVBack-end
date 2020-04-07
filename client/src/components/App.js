import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

import UIContextProvider from '../context/uiContext';
import AuthContextProvider from '../context/authContext';

import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './layouts/Home';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthContextProvider>
                <UIContextProvider>
                    <BrowserRouter>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Home} />
                        </Switch>
                        <Footer />
                    </BrowserRouter>
                </UIContextProvider>
            </AuthContextProvider>
        </ThemeProvider>
    );
}

export default App;
