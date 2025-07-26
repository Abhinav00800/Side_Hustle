import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const [cred, setCred] = useState({ name: "", email: "", password: "", location: "" });
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cred)
        });

        const json = await response.json();
        if (!json.success) {
            alert(json.error || "Failed to send OTP");
        } else {
            alert("OTP sent to your email");
            setOtpSent(true);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: cred.email, otp })
        });

        const json = await response.json();
        if (!json.success) {
            alert(json.error || "Invalid OTP");
        } else {
            alert("Account created successfully!");
            navigate('/Login');
        }
    };

    const onChange = (event) => {
        setCred({ ...cred, [event.target.name]: event.target.value });
    };

    return (
        <div className='d-flex flex-column justify-content-center align-items-center vh-100 border border-primary rounded'>
            <h2>SIGN UP</h2>
            <div>
                {!otpSent ? (
                    <form onSubmit={handleSendOtp}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" name='name' value={cred.name} onChange={onChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name='email' value={cred.email} onChange={onChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name='password' value={cred.password} onChange={onChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Address</label>
                            <input type="text" className="form-control" name='location' value={cred.location} onChange={onChange} />
                        </div>

                        <button type="submit" className="btn btn-success">Send OTP</button>
                        <Link to='/Login' className="btn btn-danger m-3">Existing User</Link>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp}>
                        <div className="mb-3">
                            <label htmlFor="otp" className="form-label">Enter OTP</label>
                            <input type="text" className="form-control" id="otp" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Verify OTP</button>
                        <button className="btn btn-secondary m-3" onClick={() => setOtpSent(false)}>Back</button>
                    </form>
                )}
            </div>
        </div>
    );
}
