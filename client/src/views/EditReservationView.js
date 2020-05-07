import {Component, default as React} from "react";
import {Redirect} from "react-router-dom";
import DatePicker from "react-datepicker";
import {Button} from "reactstrap";
import {RoomService} from "../api/RoomService";
import {ReservationService} from "../api/ReservationService";

export class EditReservationView extends Component{

    roomsService;
    reservationService;

    constructor(props){
        super(props);
        this.roomsService = new RoomService();
        this.reservationService = new ReservationService();
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            room: "", state: "", reservation: "",
            redirect: false
        };
    }

    componentDidMount(): void {
        this.handleReservationData();
    }

    handleReservationData = async () => {
        let reservationId = this.props.match.params.reservationId;
        let fetchedReservation = await this.reservationService.getReservationById(reservationId);
        console.log(fetchedReservation);
        await this.setState({reservation: fetchedReservation._id, startDate: new Date(fetchedReservation.startDate), endDate: new Date(fetchedReservation.endDate)});
    };

    render() {

        if (this.state.redirect){
            return (<Redirect to='/reservations' />);
        }

        const room = this.state.room;
        return <div>
            <h1>RESERVATION ID {this.state.reservation}</h1>
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
}