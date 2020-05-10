import React, {Component} from "react";
import Cookie from "js-cookie"
import {Redirect} from "react-router-dom";


export default class LogoutView extends Component {

    componentDidMount(): void {
        Cookie.remove("user_id");
        Cookie.remove("token");

    }

    render() {
      return <Redirect to="/login"/>
    }

}