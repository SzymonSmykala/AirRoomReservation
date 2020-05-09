import React from 'react';
import {Button, Table} from 'reactstrap';
import {ReservationService} from "../api/ReservationService";
import NavbarHeader from "../Untilities/NavbarHeader";
import {Link} from "react-router-dom";

export class AdminPanelView extends React.Component {

    reservationService;

    constructor(props){
        super(props);
        this.reservationService = new ReservationService();
        this.state = {reservations: []};
    }

    componentDidMount() {
        this.reservationService.getAllReservations().then(result => this.setState({reservations: result}), result => {console.log(result)});
    }

    render() {

        const tableHeader =  <tr>
            {/*<th>Photo</th>*/}
            {/*<th>Name</th>*/}
            {/*<th>Cost per day</th>*/}
            <th>Start Date</th>
            <th>End Date</th>
            <th>Room</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>

        const reservations = this.state.reservations.map(r => (
            <tr >
                {/*<th scope="row"><img src={r.photoUrl} width="100" height="100" alt={r.name}/></th>*/}
                {/*<td><Link to={'/rooms/' + r._id }>{r.name} </Link></td>*/}
                {/*<td>{r.costPerDay}</td>*/}
                <td>{new Date(r.startDate).toDateString()}</td>
                <td>{new Date(r.endDate).toDateString()}</td>
                <td>{r.room}</td>
                <td>{r.status}</td>
                <td>
                    <Button onClick={ () => this.handleCancel(r._id)}>Cancel</Button>
                    <span className="input-group-btn">
                        <Link to={"/reservation/" + r._id}>Edit</Link>
                    </span>
                    <Button onClick={() => this.handleApprove(r)}>Approve</Button>
                </td>

            </tr>
        ));
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

    handleApprove = (reservation) => {
        reservation.status = "Approved";
        this.reservationService.updateReservation(reservation).then(() => window.location.reload());
    }
}