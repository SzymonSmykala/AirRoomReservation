import {Component, default as React} from "react";
import {Redirect} from "react-router-dom";
import DatePicker from "react-datepicker";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
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
            room: "", state: "", reservation: "", modal: false,
            redirect: false
        };
    }

    componentDidMount(): void {
        this.handleReservationData();
    }

    handleReservationData = async () => {
        let reservationId = this.props.match.params.reservationId;
        let fetchedReservation = await this.reservationService.getReservationById(reservationId);
        this.roomsService.fetchRoomByIdAsync(fetchedReservation.room).then(r => this.setState({room: r}));
        console.log(fetchedReservation);
        await this.setState({reservation: fetchedReservation, startDate: new Date(fetchedReservation.startDate), endDate: new Date(fetchedReservation.endDate)});
    };

    handleSubmit() {
        let reservation = this.state.reservation;
        reservation.startDate = this.state.startDate;
        reservation.endDate = this.state.endDate;
        this.reservationService.updateReservation(reservation).then(r => this.handleReservationResponse(r));
    }

   toggle = () => {
        console.log('toggle');
   };

    render() {

        if (this.state.redirect){
            return (<Redirect to='/reservations' />);
        }

        const room = this.state.room;
        return <div>
            <h1>Edit reservation on {room.name}</h1>
            <th scope="row"><img src={room.photoUrl} width="300" height="300" alt={room.name}/></th>
            <h2>From</h2>
            <DatePicker selected={this.state.startDate} onChange={date => this.handleStartDateChange(date)} />
            <h2>To</h2>
            <DatePicker selected={this.state.endDate} onChange={date => this.handleEndDateChange(date)} />
            <h2>Cost: </h2>
            <h2>{this.state.cost}</h2>
            <Button color="primary" onClick={() => this.handleSubmit()}>Submit</Button>{' '}
        </div>
    }

    handleStartDateChange = (date) => {
        this.setState({startDate: date}, function(){this.updateCost()});
    };

    handleEndDateChange = (date) => {
        this.setState({endDate: date}, function(){this.updateCost()});
    };

    updateCost = () => {

        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate = this.state.startDate;
        const secondDate = this.state.endDate;
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        const currentCost = diffDays * this.state.room.costPerDay;
        this.setState({cost: currentCost});
    };

    async handleReservationResponse(response) {
        if (response.ok) {
            this.setState({redirect: true});
        } else {
            alert(await response.text());
        }
    }
}