import Navbar from '../components/Navbar'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [cred, setcred] = useState({ name: "", email: "", password: "", location: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/loginuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: cred.email, password: cred.password })
    });

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Invalid credentials");
    }
    else {
      localStorage.setItem("userEmail",cred.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate('/');
    }
  };

  const onChange = (event) => {
    setcred({ ...cred, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div><Navbar /></div>
      <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
        <h2 className=''>LOGIN</h2>
        <div className=''>
          <form onSubmit={handleSubmit}>
            
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={cred.email} onChange={onChange} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={cred.password} onChange={onChange} />
            </div>
  

            <button type="submit" className="btn btn-success">Submit</button>
            <Link to='/signup' className="btn btn-danger m-3">New User</Link>
            <Link to="/forgot-password" className="btn btn-danger m-3">Forgot Password?</Link>

          </form>
        </div>
      </div>
      
    </div>
  )
}
