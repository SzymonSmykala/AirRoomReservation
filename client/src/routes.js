
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {RegisterView} from "./views/RegisterView";

const BaseRouter = () => (
        <BrowserRouter>
            <Route
                path='/'
                render={ props => <RegisterView />} />}
            />
        </BrowserRouter>
);

export default BaseRouter;