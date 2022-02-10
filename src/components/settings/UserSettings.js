import React from 'react';
import { Container, Row, Col, Image, Form } from 'react-bootstrap';

const UserSettings = ({user}) => {
    return (
        <Container className="user-settings-container">
            <Row className="profile-info-row">
                <Col md={3} className="profile-img-col">
                    <Image
                        className="profile-img"
                        src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"></Image>
                </Col>
                <Col md={9} className="profile-info-col">
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            className="user-name form-input"
                            type="text"
                            readOnly
                            value={user.first_name}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            className="user-email form-input"
                            type="text"
                            readOnly
                            value={user.username}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    );
};

export default UserSettings;
