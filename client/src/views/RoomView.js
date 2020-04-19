import * as React from "react";
import {RoomService} from "../api/RoomService";
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "reactstrap";
import {ReservationService} from "../api/ReservationService";


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
            room: "", state: ""
        };
    }

    componentDidMount() {
        this.roomsService.fetchRoomByIdAsync(this.props.match.params.id).then(result => this.setState({room: result}));
    }

    handleChange = (date) =>  {
        this.setState({
            startDate: date,
        },  this.updateCost());
    };

    handleEndDateChange = (date) => {
        this.setState({
            endDate: date
        }, this.updateCost());
    };

    updateCost = () => {

        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate = this.state.startDate;
        const secondDate = this.state.endDate;
        console.log("First" + firstDate);
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        console.log(diffDays)
        const currentCost = diffDays * this.state.room.costPerDay;
        this.setState({cost: currentCost});
    };


    render() {
        const room = this.state.room;

        return <div>
            <h1>Make reservation on {room.name}</h1>
            <th scope="row"><img src={room.photoUrl} width="300" height="300"/></th>
            <h2>From</h2>
            <DatePicker selected={this.state.startDate} onChange={date => this.handleChange(date)} />
            <h2>To</h2>
            <DatePicker selected={this.state.endDate} onChange={date => this.handleEndDateChange(date)} />
            <h2>Cost: </h2>
            <h2>{this.state.cost}</h2>d
            <Button color="primary" onClick={() => this.handleSubmit()}>Submit</Button>{' '}
        </div>
    }

    handleSubmit() {
        this.reservationService.addReservation(this.state.startDate, this.state.endDate, "5e778da90236f173f9ceafc7", this.state.room._id).then((r) => console.log("WYSLANO" + JSON.stringify(r)))
    }
}