import React from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import googleLogo from '../../assets/images/Google.png';
import { Link } from 'react-router-dom';

const Login = ({ onSubmit, onChange, continueWithGoogle, email, password }) => {
    return (
        <div className="login-container">
            <h2 className="login-title">Diversifying in Crypto Made Easy</h2>
            <div className="manual-login">
                <Form onSubmit={(e) => onSubmit(e)}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>User Email</Form.Label>
                        <Form.Control
                            className="login-input form-input"
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={email}
                            onChange={(e) => onChange(e)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            className="login-input form-input"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </Form.Group>
                    <div className="button-wrapper">
                        <Button className="login-btn" type="submit">
                            Login
                        </Button>
                        <Link className="forgot-pwd-link" to="/reset-password">
                            Reset Password
                        </Link>
                    </div>
                </Form>
            </div>
            {/* <p> or </p>
            <div className="sso-login">
                <Button
                    className="google-btn sso-btn"
                    variant="primary"
                    type="button"
                    onClick={continueWithGoogle}>
                    <Image src={googleLogo} className="icon-img"></Image>
                    Continue with Google
                </Button>
            </div> */}
        </div>
    );
};

export default Login;
