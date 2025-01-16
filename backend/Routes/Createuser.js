const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

const bcrypt=require('bcryptjs');
const jws= require('jsonwebtoken');
const user = require('../models/user');
const jwsSceret="HahaThisisSceret";

router.post("/createuser", [body('email','invalid email').isEmail(),
body('password','invalid password').isLength({ min: 6 }), body('name').isLength({ min: 4 })], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() }); 
    }

    try {
        const { name, location, email, password } = req.body; 
        const salt=await bcrypt.genSalt(10);
        const secpassword=await bcrypt.hash(password,salt);
        await User.create({
            name,
            location,
            email,
            password:secpassword
        });
        res.status(201).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message }); 
    }
});

router.post("/loginuser", [body('email','invalid email').isEmail(),
body('password','invalid password').isLength({ min: 6 })], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors:"Invalid credentials" }); 
    }

    try {   
        let data= await User.findOne({email:req.body.email});
        if(!data){
            return res.status(401).json({ success: false, error:"Inalid credentials" });
        }
        const pwdcompare= bcrypt.compare(req.body.password,data.password);
        if(!pwdcompare) {
            return res.status(401).json({ success: false, error:"Inalid credentials" });
        }
        const userdata={
            user:{
                id:user.id
            }
        }
        const authToken= jws.sign(userdata,jwsSceret)
        return res.json({success:true,authToken});


    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message }); 
    }
});

module.exports = router;
