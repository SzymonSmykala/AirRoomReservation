import React from 'react';
import {RoomService} from '../api/RoomService';
import { Table } from 'reactstrap';
import {Link} from "react-router-dom";
import NavbarHeader from "../Untilities/NavbarHeader";
import DatePicker from 'react-datepicker';

export class Rooms extends React.Component {

    roomsService;

    constructor(props){
        super(props);
        this.roomsService = new RoomService();
        this.state = {rooms: [], startDate: new Date(), endDate: ""};
    }

    componentDidMount() {
        this.roomsService.fetchAvailableRoomsForSelectedDatesAsync(new Date("2010-05-05T10:08:33.744Z"), new Date("2021-05-03T10:08:32.744Z"))
            .then(result => this.setState({rooms: result}), result => {console.log(result)});
    }

    handleChange = (date) =>  {
        this.setState({
            startDate: date,
        });
    };

    handleEndDateChange = (date) => {
        this.setState({
            endDate: date
        });
    };

    render() {

        const tableHeader =  <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Cost per day</th>
        </tr>

        const rooms = this.state.rooms.map(room => (
                <tr>
                    <th scope="row"><img src={room.photoUrl} width="100" height="100" alt={room.name}/></th>
                    <td><Link to={'/rooms/' + room._id }>{room.name} </Link></td>
                    <td>{room.costPerDay}</td>
                </tr>
        ));

       return<div>
           <NavbarHeader/>
           <div>
               <h2>From</h2>
               <DatePicker selected={this.state.startDate} onChange={date => this.handleChange(date)} />
               <h2>To</h2>
               <DatePicker selected={this.state.endDate} onChange={date => this.handleEndDateChange(date)} />
           </div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh', marginLeft: '10vh', marginRight: '10vh'}}>
           <Table>
               <thead>
               {tableHeader}
               </thead>
               <tbody>
               {rooms}
               </tbody>
           </Table>
       </div>
       </div>
    }
}