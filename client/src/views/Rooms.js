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
        this.state = {rooms: [], startDate: new Date(), endDate: new Date()};
    }

    componentDidMount() {
        this.roomsService.fetchAvailableRoomsForSelectedDatesAsync(new Date("2010-05-05T10:08:33.744Z"), new Date("2021-05-03T10:08:32.744Z"))
            .then(result => this.setState({rooms: result}), result => {console.log(result)});
    }

    handleChange = (date) =>  {
        this.setState({
            startDate: date,
        }, function(){this.updateAvailableRooms()});
    };

    updateAvailableRooms = () => {
        this.roomsService.fetchAvailableRoomsForSelectedDatesAsync(new Date(this.state.startDate), new Date(this.state.endDate))
            .then(result => this.setState({rooms: result}), result => {console.log(result)});
    };

    handleEndDateChange = (date) => {
        this.setState({
            endDate: date
        }, function(){this.updateAvailableRooms()});
    };

    render() {

        const tableHeader =  <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Cost per day</th>
        </tr>

        const {startDate, endDate} = this.state;
        const rooms = this.state.rooms.map(room => (
                <tr>
                    <th scope="row"><img src={room.photoUrl} width="100" height="100" alt={room.name}/></th>
                    <td><Link to={'/rooms/' + room._id + "/" + new Date(startDate).toISOString() + "/" + new Date(endDate).toISOString()}>{room.name} </Link></td>
                    <td>{room.costPerDay}</td>
                </tr>
        ));

       return<div>
           <NavbarHeader/>
           <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginLeft: '10vh', marginRight: '10vh', marginTop: '10vh'}}>
               <div style={{float: "left", margin: "10px"}}>
                  <h2>From</h2>
                   <DatePicker selected={this.state.startDate} onChange={date => this.handleChange(date)} />
               </div>
               <div style={{float: "left",  margin: "10px"}}>
                    <h2>To</h2>
                    <DatePicker selected={this.state.endDate} onChange={date => this.handleEndDateChange(date)} />
               </div>
           </div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '80vh', marginLeft: '10vh', marginRight: '10vh'}}>

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