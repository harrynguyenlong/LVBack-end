import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './layouts/Home';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
                <Footer />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
