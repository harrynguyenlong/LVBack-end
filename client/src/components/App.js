import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './layouts/Home';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="" component={Home} />
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
