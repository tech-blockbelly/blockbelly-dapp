import React, { useState } from 'react';
import SignupForm from './SignupForm';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

const SignupPage = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        username: '',
        email: '',
        password: '',
        re_password: '',
    });

    const { first_name, username, email, password, re_password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        if (password === re_password) {
            signup(first_name, username, email, password, re_password);
            setAccountCreated(true);
        }
    };

    const continueWithGoogle = async () => {
        try {
            console.log(process.env.REACT_APP_API_URL);
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`,
            );

            window.location.replace(res.data.authorization_url);
        } catch (err) {}
    };

    // const continueWithFacebook = async () => {
    //     try {
    //         const res = await axios.get(
    //             `${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`,
    //         );

    //         window.location.replace(res.data.authorization_url);
    //     } catch (err) {}
    // };

    if (isAuthenticated) {
        return <Redirect to={{ pathname: '/' }} />;
    }
    if (accountCreated) {
        return <Redirect to={{ pathname: '/login' }} />;
    }
    return (
        <Container className="component-container signup-page">
            <Row>
                <Col md={8}>
                    <SignupForm
                        onChange={onChange}
                        onSubmit={onSubmit}
                        continueWithGoogle={continueWithGoogle}
                        first_name={first_name}
                        username={username}
                        password={password}
                        re_password={re_password}
                    />
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(SignupPage);
