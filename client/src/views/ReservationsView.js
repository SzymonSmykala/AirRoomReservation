import React from 'react';
import {Button, Table} from 'reactstrap';
import {ReservationService} from "../api/ReservationService";
import NavbarHeader from "../Untilities/NavbarHeader";
import {Link} from "react-router-dom";
import {RoomService} from "../api/RoomService";
import HashMap from "hashmap";

export class ReservationsView extends React.Component {

    reservationService;
    roomService;

    constructor(props){
        super(props);
        this.reservationService = new ReservationService();
        this.roomService = new RoomService();
        this.state = {reservations: [], rooms: new HashMap(), fetched: false};
    }

    componentDidMount = async () => {
        let result = await this.reservationService.getReservationByUser();
        await this.setState({reservations: result});
        await this.fetchRoomsDate();
    };

    render() {

        const tableHeader =  <tr>
            <th>Photo</th>
            <th>Cost per day</th>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
        let reservations;
        if (this.state.fetched) {
                reservations = this.state.reservations.map((r) => (
                <tr>
                    <th scope="row"><img src={this.state.rooms.get(r.room).photoUrl}width="100" height="100" alt={this.state.rooms.get(r.room).name}/></th>
                    {/*<td><Link to={'/rooms/' + r._id }>{this.state.rooms.get(r.room).name}</Link></td>*/}
                    <td>{this.state.rooms.get(r.room).costPerDay}</td>
                    <td>{this.state.rooms.get(r.room).name}</td>
                    <td>{new Date(r.startDate).toDateString()}</td>
                    <td>{new Date(r.endDate).toDateString()}</td>
                    <td>{r.status}</td>
                    <td>
                        <Button onClick={() => this.handleCancel(r._id)}>Cancel</Button>
                        <span className="input-group-btn">
                        <Link to={"/reservation/" + r._id}>Edit</Link>
                    </span>
                    </td>

                </tr>
            ));
        }

        return<div>
            <NavbarHeader/>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh', marginLeft: '10vh', marginRight: '10vh'}}>
        <Table>
            <thead>
            {tableHeader}
            </thead>
            <tbody>
            {reservations}
            </tbody>
        </Table>
        </div>

        </div>
    }

    handleCancel = reservationId =>  {
        this.reservationService.deleteReservationById(reservationId).then(() => window.location.reload());
    }

    handleEdit = reservationId => {
        //redirect
    }

    async fetchRoomsDate() {
        console.log('fetchRoomsDate');
        for (const reservation of this.state.reservations) {
           let room = await this.roomService.fetchRoomByIdAsync(reservation.room)
             this.state.rooms.set(reservation.room, room);

           console.log("FETCHED!");
        }
        this.setState({fetched: true});

    }
}