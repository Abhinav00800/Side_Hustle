import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbarstyle.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Modal from '../model';
import Cart from '../Screens/Cart';
import pic3 from "../Images/OnDemandpic.jpg";


export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/');
  };
  

  const loadCart = () => {
    setCartView(true);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light backcolor shadow">
        <div className="container-fluid">
          <Link className="navbar-brand text-light" to="/"><img src={pic3} alt="Nothing" style={{height:"60px",margin:"0px", borderRadius:"50px"}} /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto">
              <Link className="nav-link text-light fs-5 m-1" to="/home">
                <i className="bi bi-house-fill me-1"></i>Home
              </Link>
              <Link className="nav-link text-light fs-5 m-1" to="/Categories">
                <i className="bi bi-tag me-1"></i>Categories
              </Link>
              {(localStorage.getItem('authToken')) ? 
                <Link className="nav-link text-light fs-5 m-1" to="/myOrder">
                  <i className="bi bi-box-fill me-1"></i>My Orders
                </Link> 
                : ""}
              {(localStorage.getItem('authToken')) ? 
                <Link className="nav-link text-light fs-5 m-1" to="/addproduct">
                  <i className="bi bi-plus-circle me-1"></i>Add Product
                </Link> 
                : ""}
            </div>
            {!localStorage.getItem('authToken') ? (
              <div className='d-flex'>
                <Link className="btn buttonbg text-white mx-1 nav-link" to="/login">Login</Link>
                <Link className="btn buttonbg text-white mx-1 nav-link" to="/signup">Signup</Link>
              </div>
            ) : (
              <div className='d-flex align-items-center'>
                {/* <div className='bi bi-cart-fill fs-3 text-light mx-2 nav-link' onClick={loadCart}></div> */}
                <div className="btn text-light bi bi-cart-fill fs-5 nav-link" onClick={loadCart}>My Cart</div>
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : ""}
                <Link className="btn buttonbg text-white mx-2" to="/login" onClick={handleLogout}>Logout</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Chatbot Icon */}
      <Link to="/chatbot" className="chatbot-icon">
        <div className="bi bi-chat-dots fs-2 text-white"></div>
      </Link>
    </>
  );
}
