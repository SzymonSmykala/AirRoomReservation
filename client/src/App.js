import React from 'react';
import logo from './logo.svg';
import './App.css';
import API_ENDPOINT from "./Constants";
import {Rooms} from './views/Rooms';
import NavbarHeader from './Untilities/NavbarHeader'

class App extends React.Component {
  url = API_ENDPOINT;

  constructor(props){
    super(props);
    this.state = {apiResponse: ""}
  }


  render() {
    return (
     <div>
     <NavbarHeader/>
     <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh', marginLeft: '10vh', marginRight: '10vh'}}>
          <Rooms/>
     </div>
     </div>
    );
  }

}


export default App;
