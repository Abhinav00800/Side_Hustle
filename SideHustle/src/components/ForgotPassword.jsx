import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otpStage, setOtpStage] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/request-reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const json = await res.json();
        if (json.success) {
            alert("OTP sent to email");
            setOtpStage(true);
        } else {
            alert(json.error || "Error sending OTP");
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/verify-reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp, newPassword })
        });

        const json = await res.json();
        if (json.success) {
            alert("Password reset successfully!");
            window.location.href = '/Login';
        } else {
            alert(json.error || "Failed to reset password");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Forgot Password</h2>
            {!otpStage ? (
                <form onSubmit={handleRequestOTP}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Send OTP</button>
                </form>
            ) : (
                <form onSubmit={handleResetPassword}>
                    <div className="mb-3">
                        <label className="form-label">OTP</label>
                        <input type="text" className="form-control" required value={otp} onChange={(e) => setOtp(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input type="password" className="form-control" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-success">Reset Password</button>
                </form>
            )}
        </div>
    );
};

export default ForgotPassword;
