import * as React from "react";
import {InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup, Button, Form, Label} from 'reactstrap';
import {RegisterService} from "../api/RegisterService";
import {Link, Redirect} from "react-router-dom";

export class RegisterView extends React.Component {

    registerService: RegisterService;

    constructor(props) {
        super(props);
        this.registerService = new RegisterService();
        this.state = {
            username: "",
            password: "",
            submitted: false,
            redirect: false
        };
    }

    changeHandler = event => {
        const { name, value } = event.target;
        console.log(name, value);
        this.setState({ [name]: value });
    };

    registerClickHandler = async event => {
        let response = await this.registerService.registerUser(this.state.username, this.state.password);
        if (response.ok){
            this.setState({redirect: true})
        }
    };

    render() {

        if (this.state.redirect) {
            return (<Redirect to='/login' />);
        }

        return <div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh', marginLeft: '10vh', marginRight: '10vh'}}>
                <Form>
                    <label>Sign Up</label>
                    <Link to="/login" className="btn btn-primary" style={{float: "right"}}>Sign in</Link>
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
                    <Button color="primary" onClick={this.registerClickHandler} style={{ float: "right" }}>Register</Button>{' '}
                </Form>

            </div>
        </div>
    }

}