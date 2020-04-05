import React from 'react';
import {RoomService} from './api/RoomService'

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

        const rooms = this.state.rooms.map(room => (
            <div>
               <h3>{room.name}</h3>
                <p>{room.costPerDay}</p>
            </div>

        ));
        return <div>
            {rooms}

        </div>
    }

}