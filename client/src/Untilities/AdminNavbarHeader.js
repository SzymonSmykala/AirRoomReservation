import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';


export default class AdminNavbarHeader extends React.Component {

    constructor() {
        super();
        this.state = {username: ''}
    }

    handleLogout = () => {

    };

    render(){
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">AirRoomReservation Admin</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/adminPanel">Manage reservations</NavLink>
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

