import React from 'react';
import logo from './logo.svg';
import './App.css';
import API_ENDPOINT from "./Constants";
import {Rooms} from './Rooms';

class App extends React.Component {
  url = API_ENDPOINT;

  constructor(props){
    super(props);
    this.state = {apiResponse: ""}
  }

  callApi(){

    fetch( this.url + "/reservations")
        .then(res => res.text())
        .then(res => this.setState({apiResponse: res}))
  }

  componentDidMount(){
    this.callApi();
  }

  render() {
    return (
     <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh', marginLeft: '10vh', marginRight: '10vh'}}>
          <Rooms/>
     </div>
    );
  }

}


export default App;
