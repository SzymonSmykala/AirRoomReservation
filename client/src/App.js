import React from 'react';
import './App.css';
import API_ENDPOINT from "./Constants";
import {Rooms} from './views/Rooms';
import NavbarHeader from './Untilities/NavbarHeader'
import {Router} from "react-router-dom";
import BaseRouter from "./routes";
import {RegisterView} from "./views/RegisterView";

class App extends React.Component {
  url = API_ENDPOINT;

  constructor(props){
    super(props);
    this.state = {apiResponse: ""}
  }


    render() {
        return (
            <div className="App" style={{height: "100%"}}>
              <RegisterView/>
            </div>);
    }

}


export default App;
