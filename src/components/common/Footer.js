import React from 'react';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-left">
                <p className="footer-text">Copyright © 2021</p>
                <p className="footer-text">Blockbelly All rights reserved.</p>
            </div>

            <div className="footer-links footer-right">
                <a href="/" className="footer-text privacy-link">
                    Privacy Notice
                </a>
                <a href="/" className="footer-text status-link">
                    Status
                </a>
            </div>
        </footer>
    );
};

export default Footer;
