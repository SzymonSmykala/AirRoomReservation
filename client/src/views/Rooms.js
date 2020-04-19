import React from 'react';
import {RoomService} from '../api/RoomService';
import { Table } from 'reactstrap';

export class Rooms extends React.Component {

    roomsService;

    constructor(props){
        super(props);
        this.roomsService = new RoomService();
        this.state = {rooms: []};
    }

    componentDidMount() {
        this.roomsService.fetchRoomsAsync().then(result => this.setState({rooms: result}));
    }

    render() {

        const tableHeader =  <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Cost per day</th>
        </tr>

        const rooms = this.state.rooms.map(room => (
                <tr>
                    <th scope="row"><img src={room.photoUrl} width="100" height="100"/></th>
                    <td>{room.name}</td>
                    <td>{room.costPerDay}</td>
                </tr>

        ));
       return <Table>
            <thead>
                {tableHeader}
            </thead>
            <tbody>
                {rooms}
            </tbody>
        </Table>
    }
}