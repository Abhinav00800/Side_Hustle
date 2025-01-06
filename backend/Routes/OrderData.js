const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        // console.log("Request body:", req.body);

        let data = req.body.order_data;
       await data.splice(0,0,{order_date:req.body.order_date})
        let eId = await Order.findOne({ 'email': req.body.email });
        
        if (!eId) {
            await Order.create({    
                email: req.body.email,
                order_data: [data]
            });
            res.json({ success: true });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            ).then(()=>{
                res.json({success:true})
            })
        }
    } catch (error) {
        console.error("Error processing order:", error); 
        res.status(500).send({ message: "Server Error", error: error.message });
    }
});

router.post('/myorderData', async (req, res) => {
    try {
        const { email } = req.body;

        // Find the order data based on the email
        const orderData = await Order.findOne({ email: email });

        if (!orderData) {
            return res.json({ orderData: null });
        }

        res.json({ orderData: orderData.order_data });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});



module.exports = router;
