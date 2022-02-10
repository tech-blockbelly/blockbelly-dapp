import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
// import SearchField from './SearchField';
// import { connect } from 'react-redux';
import SwitchModal from '../login/SwitchModal';

const Header = ({ isAuthenticated, user }) => {
    const [modalShow, setModalShow] = useState(false);
    const handleShow = () => setModalShow(true);

    useEffect(() => {
        if (isAuthenticated) {
            setModalShow(false);
        }
    }, [isAuthenticated]);

    return (
        <div className="header-container">
            {/* <SearchField /> */}
            {isAuthenticated ? (
                <div className="header-wrapper">
                    {user && (
                        <p className="welcome-user">
                            Hello,{' '}
                            <span className="username">{user['username']}</span>
                        </p>
                    )}
                    {/* <Button className="action-btn">Switch to DeFi</Button> */}
                </div>
            ) : null}
            <SwitchModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    );
};

export default Header;
