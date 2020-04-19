import * as React from "react";
import {RoomService} from "../api/RoomService";
import {useState} from "react";
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export class RoomView extends React.Component {

    roomsService;

    constructor(props){
        super(props);
        this.roomsService = new RoomService();
        this.state = {
            startDate: new Date()
        };
        this.state = {room: ""};
    }

    componentDidMount() {
        this.roomsService.fetchRoomByIdAsync(this.props.match.params.id).then(result => this.setState({room: result}));
    }

    handleChange(date) {
        this.setState({
            startDate: date
        })
    }

    render() {
        const room = this.state.room;

        return <div>
            <DatePicker selected={this.state.startDate} onChange={date => this.handleChange(date)} />
            <h1>Id: {this.props.match.params.id}</h1>
            <h1>Room: {room.name}</h1>
        </div>
    }

}