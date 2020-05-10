import React from 'react';
import Cookie from "js-cookie"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';
import {Redirect} from "react-router-dom";


class NavbarHeader extends React.Component {

    constructor() {
        super();
        this.state = {username: '', logout: false}
    }

    handleLogout = () => {
        Cookie.remove('user_id');
        Cookie.remove('token');
        this.setState( {logout: true});
    };

    render(){

        if (this.state.logout){
            return (<Redirect to="/login" />);
        }

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">AirRoomReservation</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/rooms">Rooms</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/reservations">My reservations</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav  navbar>
                        <NavItem>
                            <NavLink href="/logout">Logout</NavLink>
                        </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavbarHeader;