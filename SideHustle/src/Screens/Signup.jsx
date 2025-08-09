import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar'; // Assuming you'll use the new Navbar
// import signupBg from '../Images/signupBg.jpg'; // Assuming you have a suitable background image

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
            alert(json.error || "Failed to send OTP. Please check your details.");
        } else {
            alert("OTP sent to your email. Please check your inbox.");
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
            alert(json.error || "Invalid OTP. Please try again.");
        } else {
            alert("Account created successfully! You can now log in.");
            navigate('/Login');
        }
    };

    const onChange = (event) => {
        setCred({ ...cred, [event.target.name]: event.target.value });
    };

    return (
        <div
            className="flex flex-col min-h-screen bg-gray-100 bg-cover bg-center"
        >
            {/* <Navbar/> */}
            {/* The Navbar component will be positioned here */}
            {/* <Navbar /> */}
            <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8 p-10 bg-gray-100 rounded-xl shadow-2xl backdrop-blur-md bg-opacity-80">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Create a new account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">sign in to your existing account</Link>
                        </p>
                    </div>
                    {/* --- First Step: User Details Form --- */}
                    {!otpSent ? (
                        <form className="mt-8 space-y-6" onSubmit={handleSendOtp}>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="name" className="sr-only">Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Full Name"
                                        value={cred.name}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                        value={cred.email}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                        value={cred.password}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="location" className="sr-only">Address</label>
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        autoComplete="street-address"
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Address (Optional)"
                                        value={cred.location}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>
                    ) : (
                        // --- Second Step: OTP Verification Form ---
                        <form className="mt-8 space-y-6" onSubmit={handleVerifyOtp}>
                            <p className="text-center text-sm text-gray-600">
                                An OTP has been sent to **{cred.email}**. Please enter it below to verify your account.
                            </p>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="otp" className="sr-only">Enter OTP</label>
                                    <input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        required
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <button
                                    type="button"
                                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                                    onClick={() => setOtpSent(false)}
                                >
                                    &larr; Back
                                </button>
                                <button
                                    type="submit"
                                    className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                >
                                    Verify & Sign Up
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}