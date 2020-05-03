import React from 'react';
import { Table } from 'reactstrap';
import {Link} from "react-router-dom";
import {ReservationService} from "../api/ReservationService";

export class ReservationsView extends React.Component {

    reservationService;

    constructor(props){
        super(props);
        this.reservationService = new ReservationService();
        this.state = {reservations: []};
    }

    componentDidMount() {
        this.reservationService.getReservationByUser().then(result => this.setState({reservations: result}), result => {console.log(result)});
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
        </tr>

        const reservations = this.state.reservations.map(r => (
            <tr >
                {/*<th scope="row"><img src={r.photoUrl} width="100" height="100" alt={r.name}/></th>*/}
                {/*<td><Link to={'/rooms/' + r._id }>{r.name} </Link></td>*/}
                {/*<td>{r.costPerDay}</td>*/}
                <td>{r.startDate}</td>
                <td>{r.endDate}</td>
                <td>{r.room}</td>
                <td>{r.status}</td>
            </tr>
        ));
        return <Table>
            <thead>
            {tableHeader}
            </thead>
            <tbody>
            {reservations}
            </tbody>
        </Table>
    }
}