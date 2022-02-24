import React, { Fragment, useState } from 'react';
import { Image, Navbar, Nav } from 'react-bootstrap';
import { NavLink, Redirect } from 'react-router-dom';
import bbLogo from '../../assets/images/Blockbelly.png';
import { IoCube, IoLogOut, IoWallet } from 'react-icons/io5';
import { BsFillGearFill } from 'react-icons/bs';
import { RiCopperCoinFill, RiAddCircleLine } from 'react-icons/ri';
import Header from './Header';

const NavigationMenu = () => {
    const [expanded, setExpanded] = useState(false);

    const authLinks = () => (
        <Fragment>
            {/* <NavLink
                onClick={() => setExpanded(false)}
                activeClassName="active"
                className="nav-link"
                to="/cefi/baskets">
                <RiCopperCoinFill /> <span>CeFi Baskets</span>
            </NavLink> */}
            <NavLink
                onClick={() => setExpanded(false)}
                activeClassName="active"
                className="nav-link"
                to="/baskets">
                <IoWallet /> <span>DeFi Baskets</span>
            </NavLink>
            <NavLink
                onClick={() => setExpanded(false)}
                activeClassName="active"
                className="nav-link"
                to="/create">
                <RiAddCircleLine /> <span>Create a Basket</span>
            </NavLink>
            {/* <NavLink
                onClick={() => setExpanded(false)}
                activeClassName="active"
                className="nav-link"
                to="/ledger">
                <IoCube /> <span>Dashboard</span>
            </NavLink> */}
            {/* <NavLink
                onClick={() => setExpanded(false)}
                activeClassName="active"
                className="nav-link"
                to="/settings">
                <BsFillGearFill /> <span>Settings</span>
            </NavLink>
            <NavLink
                onClick={() => setExpanded(false)}
                activeClassName="active"
                className="nav-link logout-btn"
                to="/logout"
                onClick={logout_user}>
                <IoLogOut /> <span>Logout</span>
            </NavLink> */}
        </Fragment>
    );

    return (
        <div className="navigation-menu-container">
            <Navbar
                collapseOnSelect
                expand="lg"
                className="navbar navbar-light bg-light"
                expanded={expanded}>
                <Navbar.Brand href="/" className="brand-wrapper">
                    {/* <Image src={bbLogo} className="bb-logo"></Image> */}
                    <div>
                        <h2 className="bb-title">Blockbelly</h2>
                        <p className="beta-disclaimer">Beta version</p>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle
                    onClick={() => setExpanded(expanded ? false : 'expanded')}
                    aria-controls="responsive-navbar-nav"
                />
                {/* <Navbar.Collapse id="basic-navbar-nav">
                    <Header></Header>
                    <Nav className="mr-auto">
                        {authLinks()}
                    </Nav>
                </Navbar.Collapse> */}
            </Navbar>
            {/* <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Button
                            activeClassName="active"
                            className="create-basket-btn"
                            to="/create-basket">
                            <IoAddCircle /> <span>Create Basket</span>
                        </Button>
                    </Nav>
                </Navbar.Collapse> */}
            {/* {redirect ? (
                <Redirect to={{ pathname: '/' }} />
            ) : (
                <Fragment></Fragment>
            )} */}
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default NavigationMenu;
