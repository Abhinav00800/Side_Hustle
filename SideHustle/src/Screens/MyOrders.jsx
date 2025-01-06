import React, { useEffect, useState } from 'react';
import Fotter from '../components/Fotter'; 
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) return; 

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/myorderData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch order data");
            }

            const data = await response.json();
            setOrderData(data.orderData); // Assuming data.orderData contains your orders
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />

            <div className='container'>
                <div className='row'>
                    {orderData ? (
                        orderData.map((orderGroup, index) => (
                            <div key={index} className="mb-4">
                                <div className='m-auto mt-5'>
                                    <strong>Order Date: {orderGroup[0].order_date}</strong>
                                    <hr />
                                </div>
                                <div className='row'>
                                    {orderGroup.slice(1).map((item, itemIndex) => (
                                        <div key={itemIndex} className='col-12 col-md-6 col-lg-3'>
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>

                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                        <span className='m-1'>{item.qty}</span>
                                                        <span className='m-1'>{item.size}</span>
                                                        <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                            ₹{item.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center mt-5">No orders found.</div>
                    )}
                </div>
            </div>

            <Fotter />
        </div>
    );
}
