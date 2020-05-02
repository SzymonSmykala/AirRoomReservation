import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route} from 'react-router-dom';
import {RoomView} from "./views/RoomView";
import {RegisterView} from "./views/RegisterView";
import {LoginView} from "./views/LoginView";


const routing = (
    <BrowserRouter>
        <div>
            <Route exact path="/rooms/:id" component={RoomView}/>
            <Route exact path="/register" component={RegisterView}/>
            <Route exact path="/login" component={LoginView}/>
            <Route exact path="/" component={App}/>

        </div>
    </BrowserRouter>
);

ReactDOM.render(
 routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
