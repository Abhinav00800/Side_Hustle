import React from 'react';
import './Fotter.css'; // Optional CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p>Phone: (+91) 6283130835</p>
                    <p>Email: ondemandservices@gmail.com</p>
                    <p>NIT JALANDHARy</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-media">
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">LinkedIn</a></li>
                        <li><a href="#">Instagram</a></li>
                    </ul>
                       
                    </div>
                </div>
                
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 On-Demand. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
