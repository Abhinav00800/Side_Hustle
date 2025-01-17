import './Navbarstyle.css';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, useDispatchCart } from './contextReducer';

export default function Card(props) {
    const buttonRef = useRef(null);
    const navigate = useNavigate();
    const foodItem = props.item;
    let data = useCart();
    let dispatch = useDispatchCart();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(props.options[0]?.quantity || ""); // Default to first quantity
    const priceRef = useRef();

    const handleADDToCart = async () => {
        let food = [];
        for (const item of data) {
            if (item.id === foodItem._id) {
                food = item;
                break;
            }
        }

        if (food.length > 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty });
                return;
            } else if (food.size !== size) {
                await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
                console.log("Size different so simply ADD one more to the list");
                return;
            }
            return;
        }

        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size });
    };
    const handleAsk = async () => {
        alert("Please contact the following busniess partner for more details: "+ props.email)
    }

    useEffect(() => {
        if (priceRef.current) {
            setSize(priceRef.current.value);
        }
    }, []);

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
                            {/* Quantity Selector */}
                            <select className='m-2 h-50 buttonbg rounded' onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    );
                                })}
                            </select>

                            {/* Size Selector */}
                            <select className='m-2 h-50 buttonbg rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {sizeOptions.map((opt) => (
                                    <option key={opt.quantity} value={opt.quantity}>
                                        {opt.quantity}
                                    </option>
                                ))}
                            </select>

                            {/* Price Display */}
                            <div className='d-inline h-100 fs-5'>
                                ₹{finalPrice}/-
                            </div>
                            <hr />
                            <div className='d-flex align-items-center justify-content-between'>

                                <div className='p-3'>
                                    <button className=" buttonbg text-white" onClick={handleADDToCart}>Add to cart</button>
                                </div>
                                <div className='p-3'>
                                    <button className="buttonbg text-white" onClick={handleAsk}>Ask details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
