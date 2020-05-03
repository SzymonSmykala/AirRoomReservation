import React from 'react';
import './App.css';
import API_ENDPOINT from "./Constants";
import {LoginView} from "./views/LoginView";

class App extends React.Component {
  url = API_ENDPOINT;

  constructor(props){
    super(props);
    this.state = {apiResponse: ""}
  }


    render() {
        return (
            <div className="App" style={{height: "100%"}}>
              <LoginView/>
            </div>);
    }

}


export default App;
