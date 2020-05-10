import * as React from "react";
import {RoomService} from "../api/RoomService";
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "reactstrap";
import {ReservationService} from "../api/ReservationService";
import Cookie from "js-cookie"
import {Redirect} from "react-router-dom";
import NavbarHeader from "../Untilities/NavbarHeader";


export class RoomView extends React.Component {

    roomsService;
    reservationService;

    constructor(props){
        super(props);
        this.roomsService = new RoomService();
        this.reservationService = new ReservationService();
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            room: "", state: "",
            redirect: false
        };
    }

    componentDidMount() {
        this.roomsService.fetchRoomByIdAsync(this.props.match.params.id).then(result => this.setState({room: result}));
    }

    handleChange = (date) =>  {
        this.setState({
            startDate: date,
        }, function() { this.updateCost() });
    };

    handleEndDateChange = (date) => {
        this.setState({
            endDate: date
        }, function() { this.updateCost() });
    };

    updateCost = () => {

        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate = this.state.startDate;
        const secondDate = this.state.endDate;
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        const currentCost = diffDays * this.state.room.costPerDay;
        this.setState({cost: currentCost});
    };

    render() {

        if (this.state.redirect){
            return (<Redirect to='/reservations' />);
        }

        const room = this.state.room;
        return <div>
            <NavbarHeader/>
            <h1>Make reservation on {room.name}</h1>
            <th scope="row"><img src={room.photoUrl} width="300" height="300" alt={room.name}/></th>
            <h2>From</h2>
            <DatePicker selected={this.state.startDate} onChange={date => this.handleChange(date)} />
            <h2>To</h2>
            <DatePicker selected={this.state.endDate} onChange={date => this.handleEndDateChange(date)} />
            <h2>Cost: </h2>
            <h2>{this.state.cost}</h2>
            <Button color="primary" onClick={() => this.handleSubmit()}>Submit</Button>{' '}
        </div>
    }

    handleSubmit() {
        const userId = Cookie.get('user_id');
        this.reservationService.addReservation(this.state.startDate, this.state.endDate, userId, this.state.room._id, this.state.cost).then(res => this.handleReservationResponse(res));
    }

    async handleReservationResponse(response) {
        if (response.ok) {
            this.setState({redirect: true});
        } else {
            alert(await response.text());
        }
    }
}