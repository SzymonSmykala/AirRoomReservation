import * as React from "react";
import {InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup, Button, Form, Label} from 'reactstrap';
import {LoginService} from "../api/LoginService";
import Cookie from "js-cookie"
import {Redirect} from "react-router-dom";

export class LoginView extends React.Component {

    loginService: LoginService;

    constructor(props) {
        super(props);
        this.loginService = new LoginService();
        this.state = {
            username: "",
            password: "",
            submitted: false,
            redirect: false,
            error: false
        };
    }

    changeHandler = event => {
        const { name, value } = event.target;
        console.log(name, value);
        this.setState({ [name]: value });
    };

    registerClickHandler = async event => {
        let response = await this.loginService.login(this.state.username, this.state.password);
        if(response.success){
            Cookie.set("token", response.token);
            Cookie.set("user_id", response.user_id);
            this.setState({redirect: true})
        }else{
            this.setState({error: true})
        }
    };

    render() {
        const { redirect } = this.state;

        if(redirect) {
            return (<Redirect to='/rooms' />);
        }

        return <div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh', marginLeft: '10vh', marginRight: '10vh'}}>
           <Form>
            <label>Sign Up</label>
                <Button style={{ float: "right" }} >Sign In</Button>
            <FormGroup>
                <label htmlFor="username">Your Username</label>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText name="username" >@</InputGroupText>
                </InputGroupAddon>
                <Input placeholder="username" onChange={this.changeHandler} name="username"/>
            </InputGroup>
            </FormGroup>
            <br/>
            <FormGroup>
                <Label for="examplePassword">Your Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="password" onChange={this.changeHandler}/>
            </FormGroup>
            <br/>
            <Button color="primary" onClick={this.registerClickHandler} style={{ float: "right" }}>Login</Button>{' '}
            </Form>

            </div>
        </div>
    }
}