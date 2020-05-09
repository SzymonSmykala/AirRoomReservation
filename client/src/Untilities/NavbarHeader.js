import React from 'react';
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


class NavbarHeader extends React.Component {

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
                        <NavbarText OnClick={this.handleLogout}>Logout</NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavbarHeader;