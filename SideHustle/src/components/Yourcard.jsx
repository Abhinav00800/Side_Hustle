import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, useDispatchCart } from './contextReducer';

export default function Card(props) {
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(props.options[0]?.quantity || ""); 
    const priceRef = useRef();

    useEffect(() => {
        if (priceRef.current) {
            setSize(priceRef.current.value);
        }
    }, []);

    let options = props.options;

    const sizeOptions = options.map((opt) => ({
        quantity: opt.quantity,
        price: opt.price,
    }));

    const finalPrice = qty * (sizeOptions.find((opt) => opt.quantity === size)?.price || 0);

    const cardStyle = {
        width: "18rem",
        border: "1px solid #ddd",
        borderRadius: "0.5rem",
        transition: "all 0.3s ease-in-out",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    };

    const cardHoverStyle = {
        transform: "translateY(-10px)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
        border: "1px solid  rgb(255, 187, 0)",
    };

    const imgStyle = {
        height: "100%",
        width: "100%",
        objectFit: "cover",
        transition: "transform 0.3s ease",
    };

    const imgHoverStyle = {
        transform: "scale(1.05)",
    };

    const titleHoverStyle = {
        color: "#ffce33",
    };

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='d-flex justify-content-center'>
            <div
                className="card mt-3"
                style={isHovered ? { ...cardStyle, ...cardHoverStyle } : cardStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    className="card-img-container"
                    style={{
                        height: "200px",
                        overflow: "hidden",
                        borderRadius: "0.5rem",
                        position: "relative",
                    }}
                >
                    <img
                        src={props.img}
                        className="card-img-top"
                        alt={props.name}
                        style={isHovered ? { ...imgStyle, ...imgHoverStyle } : imgStyle}
                    />
                </div>
                <div className="card-body text-center p-3">
                    <h5
                        className="card-title fontchange mb-3"
                        style={isHovered ? titleHoverStyle : {}}
                    >
                        {props.name}
                    </h5>
                    <div className="container w-100 d-flex justify-items-evenly">
                        {/* Size Selector */}
                        <select
                            className='m-2 p-2 buttonbg rounded'
                            onChange={(e) => setSize(e.target.value)}
                            style={{ width: "50%", fontSize: "1rem" }}
                        >
                            {sizeOptions.map((opt) => (
                                <option key={opt.quantity} value={opt.quantity}>
                                    {opt.quantity}
                                </option>
                            ))}
                        </select>

                        <div className="d-flex justify-content-center align-items-center mt-2">
                            <span className="fs-5 fw-bold text-success">₹{finalPrice}/-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
