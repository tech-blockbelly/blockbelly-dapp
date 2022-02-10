import React from 'react';
import Image from 'react-bootstrap/Image';
import error from '../../assets/images/error.png';

const ErrorModule = () => {
    return (
        <div className="error-container">
            <Image src={error} className="error-icon"></Image>
            <h2 className="error-message">
                Ooops looks like something went wrong
            </h2>
            <a href="/" className="back-btn btn">
                Back to home
            </a>
        </div>
    );
};

export default ErrorModule;
