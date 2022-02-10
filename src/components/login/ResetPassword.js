import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../../actions/auth';
import { Container, Button, Row, Col } from 'react-bootstrap';

const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        reset_password(email);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to={{ pathname: '/' }} />;
    }

    return (
        <Container className="container mt-5 reset-password-container">
            <Row>
                <Col md={8}>
                    <h2>Request Password Reset:</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={(e) => onChange(e)}
                                required
                            />
                        </div>
                        <Button className="btn btn-primary" type="submit">
                            Reset Password
                        </Button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default connect(null, { reset_password })(ResetPassword);
