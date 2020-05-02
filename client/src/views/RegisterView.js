import * as React from "react";
import {InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup, Button} from 'reactstrap';
import {RegisterService} from "../api/RegisterService";

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
        await this.registerService.registerUser(this.state.username, this.state.password);
    };

    render() {
        return <div>
            REGISTER
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText name="username" >@</InputGroupText>
                </InputGroupAddon>
                <Input placeholder="username" onChange={this.changeHandler} name="username"/>
            </InputGroup>
            <br/>
            <FormGroup>
                <Input type="password" name="password" id="examplePassword" placeholder="password" onChange={this.changeHandler}/>
            </FormGroup>
            <br/>
            <Button color="primary" onClick={this.registerClickHandler}>Sign Up</Button>{' '}
        </div>
    }

}