import React, { useState, useRef, useEffect } from 'react';
import './Navbarstyle.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, useDispatchCart } from './contextReducer';

export default function Card(props) {
    const navigate = useNavigate();
    const foodItem = props.item;
    let data = useCart();
    let dispatch = useDispatchCart();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(props.options[0] ? Object.keys(props.options[0])[0] : ""); // Default to first option
    const priceRef = useRef();

    const handleADDToCart = async () => {
        let food = []
        for (const item of data) {
          if (item.id === foodItem._id) {
            food = item;
    
            break;
          }
        }
        // console.log(food)
        console.log(new Date())
        if (food != []) {
          if (food.size === size) {
            await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
            return
          }
          else if (food.size !== size) {
            await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
            console.log("Size different so simply ADD one more to the list")
            return
          }
          return
        }
    
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })
    
    }

 

    useEffect(() => {
        if (priceRef.current) {
            setSize(priceRef.current.value);
        }
    }, []);

    let options = props.options;
    let propoption = Object.keys(options[0]);

    const finalPrice = qty * (options[0][size] ? parseInt(options[0][size]) : 0); // Handle size case

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ width: "20rem" }}>
                    <img src={props.foodimg} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} alt="Nothing" />
                    <div className="card-body">
                        <h5 className="card-title fontchange">{props.foodname}</h5>
                        <div className='container w-100'>
                            <select className='m-2 h-50 buttonbg rounded'  onChange={(e) => setQty(e.target.value)}>
                                {
                                    Array.from(Array(6), (e, i) => {
                                        return (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        );
                                    })
                                }
                            </select>
                            <select className='m-2 h-50 buttonbg rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {propoption.map((data) => {
                                    return (<option key={data} value={data}>{data}</option>)
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5'>
                                ₹{finalPrice}/-
                            </div>
                            <hr />
                            <div className='p-3'>
                                <button className="btn buttonbg text-white" onClick={handleADDToCart}>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
