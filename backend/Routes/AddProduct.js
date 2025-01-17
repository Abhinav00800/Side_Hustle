const express = require('express');
const router = express.Router();
const Ondemand=require('../models/Ondemand')

router.post("/AddProduct", async (req, res) => {
    try {
        const { email, CategoryName, name, img, options, description, pincode } = req.body;

        // Validate required fields
        if (!email || !CategoryName || !name || !img || !options || !pincode) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Create the product
        await Ondemand.create({
            email,
            CategoryName,
            name,
            img,
            options,
            description,
            pincode
        });

        res.status(201).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/myproducts/:email',async (req,res)=>{
    try{
        
        const email= req.params.email;
        if(!email){
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const mydata= await Ondemand.find({ email: email })
        // console.log(mydata);
        res.json({ mydata: mydata});

    }catch(err){
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

module.exports=router;