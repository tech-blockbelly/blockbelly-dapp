import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Login from './Login';
import SignupForm from '../signup/SignupForm';

const SwitchModal = (props) => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Modal {...props} className="switch-modal">
            {isLogin ? <Login /> : <SignupForm />}
            <div className="link-container">
                <h4 className="title">
                    {isLogin
                        ? "Don't have an account?"
                        : 'Already have an account?'}{' '}
                </h4>
                <Button
                    className="link-btn btn"
                    onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Sign up' : 'Sign in'}
                </Button>
            </div>
        </Modal>
    );
};

export default SwitchModal;
