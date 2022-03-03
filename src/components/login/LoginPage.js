import React, { useState } from 'react';
import Login from './Login';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Signup from './Signup';

const LoginPage = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        login(email, password);
    };

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`,
            );
            window.location.replace(res.data.authorization_url);
        } catch (err) {}
    };

    // const continueWithFacebook = async () => {
    //     try {
    //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`)

    //         window.location.replace(res.data.authorization_url);
    //     } catch (err) {

    //     }
    // };

    if (isAuthenticated) {
        return <Redirect to={{ pathname: '/' }} />;
    }

    return (
        <Container className="component-container login-page">
            <Row>
                <Col md={8}>
                    <Login
                        onSubmit={onSubmit}
                        onChange={onChange}
                        continueWithGoogle={continueWithGoogle}
                        email={email}
                        password={password}
                    ></Login>
                    {/* <Signup /> */}
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginPage);
