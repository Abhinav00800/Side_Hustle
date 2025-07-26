const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const jwtSecret = "HahaThisisSceret";

// Temporary store for OTPs (use Redis or DB for production)
let pendingUsers = new Map();

// Nodemailer config (use real credentials in production)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abhisharma19091999@gmail.com', // your email
        pass: 'wgar spca alsz cxga'   // app password
    }
});

// 1️⃣ Register with OTP
router.post("/createuser", [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password too short').isLength({ min: 6 }),
    body('name', 'Name too short').isLength({ min: 4 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() }); 
    }

    try {
        const { name, location, email, password } = req.body; 

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, error: "Email already registered" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(password, salt);

        // Save user temporarily
        pendingUsers.set(email, {
            name,
            location,
            email,
            password: secPassword,
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000 // 5 min expiry
        });

        // Send OTP via email
        await transporter.sendMail({
            from: 'abhisharma19091999@gmail.com',
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP is ${otp}`
        });

        res.status(200).json({ success: true, message: "OTP sent to email" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message }); 
    }
});

// 2️⃣ Verify OTP
router.post("/verify-otp", [
    body('email').isEmail(),
    body('otp').isLength({ min: 6, max: 6 })
], async (req, res) => {
    const { email, otp } = req.body;
    const pending = pendingUsers.get(email);

    if (!pending) {
        return res.status(400).json({ success: false, error: "No pending OTP for this email" });
    }

    if (pending.otp !== otp) {
        return res.status(400).json({ success: false, error: "Invalid OTP" });
    }

    if (Date.now() > pending.expiresAt) {
        pendingUsers.delete(email);
        return res.status(400).json({ success: false, error: "OTP expired" });
    }

    try {
        const newUser = await User.create({
            name: pending.name,
            location: pending.location,
            email: pending.email,
            password: pending.password
        });

        pendingUsers.delete(email);
        res.status(201).json({ success: true, message: "User verified and created" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


router.post("/loginuser", [body('email','invalid email').isEmail(),
body('password','invalid password').isLength({ min: 6 })], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors:"Invalid empty" }); 
    }

    try {   
        let data= await User.findOne({email:req.body.email});
        if(!data){
            return res.status(401).json({ success: false, error:"Inalid data" });
        }
        const pwdcompare= bcrypt.compare(req.body.password,data.password);
        if(!pwdcompare) {
            return res.status(401).json({ success: false, error:"Inalid compare" });
        }
        const userdata = {
    user: {
        id: data.id // ✅ Correct variable
    }
}

        // const authToken= jws.sign(userdata,jwsSceret)
        return res.json({success:true});


    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message }); 
    }
});

// Add below existing code in your router file
let passwordResetOTPs = new Map(); // temp in-memory store

// 1️⃣ Request OTP
router.post("/request-reset", [
    body('email').isEmail()
], async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ success: false, error: "Email not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    passwordResetOTPs.set(email, {
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000
    });

    await transporter.sendMail({
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP to reset password is ${otp}`
    });

    res.json({ success: true, message: "OTP sent to email" });
});

// 2️⃣ Verify OTP and reset password
router.post("/verify-reset", [
    body('email').isEmail(),
    body('otp').isLength({ min: 6 }),
    body('newPassword').isLength({ min: 6 })
], async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const record = passwordResetOTPs.get(email);

    if (!record || record.otp !== otp || Date.now() > record.expiresAt) {
        return res.status(400).json({ success: false, error: "Invalid or expired OTP" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);

    await User.findOneAndUpdate({ email }, { password: hashed });
    passwordResetOTPs.delete(email);

    res.json({ success: true, message: "Password reset successfully" });
});


module.exports = router;
