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
import {Rooms} from "./views/Rooms";
import {ReservationsView} from "./views/ReservationsView";
import {EditReservationView} from "./views/EditReservationView";
import {AdminPanelView} from "./views/AdminPanelView";
import LogoutView from "./views/LogoutView";

const routing = (
    <BrowserRouter>
        <div>
            <Route exact path="/rooms/:id/:startDate/:endDate" component={RoomView}/>
            <Route exact path="/rooms" component={Rooms}/>
            <Route exact path="/register" component={RegisterView}/>
            <Route exact path="/login" component={LoginView}/>
            <Route exact path="/reservations" component={ReservationsView}/>
            <Route exact path="/reservation/:reservationId" component={EditReservationView}/>
            <Route exact path="/adminPanel" component={AdminPanelView}/>
            <Route exact path="/logout" component={LogoutView}/>
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
