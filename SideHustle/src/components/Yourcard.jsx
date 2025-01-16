import React, { useState, useRef, useEffect } from 'react';
import './Navbarstyle.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, useDispatchCart } from './contextReducer';

export default function Card(props) {
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(props.options[0]?.quantity || ""); // Default to first quantity
    const priceRef = useRef();


    useEffect(() => {
        if (priceRef.current) {
            setSize(priceRef.current.value);
        }
    }, []);
    useEffect(() => {
        
    },);

    let options = props.options;

    // Extract size and price mapping
    const sizeOptions = options.map((opt) => ({
        quantity: opt.quantity,
        price: opt.price,
    }));

    const finalPrice = qty * (sizeOptions.find((opt) => opt.quantity === size)?.price || 0);

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ width: "20rem" }}>
                    <img src={props.foodimg} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} alt="Nothing" />
                    <div className="card-body">
                        <h5 className="card-title fontchange">{props.foodname}</h5>
                        <div className='container w-100'>
                            {/* Size Selector */}
                            <select className='m-2 h-50 buttonbg rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {sizeOptions.map((opt) => (
                                    <option key={opt.quantity} value={opt.quantity}>
                                        {opt.quantity}
                                    </option>
                                ))}
                                
                            </select>
                            <div className='d-inline h-100 fs-5'>
                                ₹{finalPrice}/-
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
