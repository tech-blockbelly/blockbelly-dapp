import React from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import googleLogo from '../../assets/images/Google.png';
const signup = ({
    onChange,
    onSubmit,
    continueWithGoogle,
    username,
    email,
    password,
    re_password,
}) => {
    return (
        <div className="signup-form-container">
            <h2 className="signup-title">Signup to join Blockbelly today</h2>
            <div className="manual-signup">
                <Form className="signup-form" onSubmit={(e) => onSubmit(e)}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            className="signup-input form-input"
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => onChange(e)}
                            placeholder="Enter Username"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            className="signup-input form-input"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => onChange(e)}
                            placeholder="Enter email"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            className="signup-input form-input"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                            placeholder="Password"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Re-Password</Form.Label>
                        <Form.Control
                            className="signup-input form-input"
                            type="password"
                            name="re_password"
                            value={re_password}
                            onChange={(e) => onChange(e)}
                            placeholder="Confirm Password"
                            required
                        />
                    </Form.Group>
                    <div className="button-wrapper">
                        <Button className="signup-btn" type="submit">
                            Sign up
                        </Button>
                    </div>
                </Form>
                {/* <div className="sso-signup">
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
        </div>
    );
};

export default signup;
