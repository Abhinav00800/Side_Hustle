import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';

export default function Signup() {
    const [cred, setcred] = useState({ name: "", email: "", password: "", location: "" });
    const navigate= useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/createuser`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password, location: cred.location })
        });
        
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Invalid credentials");
        }
        else{
            navigate('/Login');
        }
    };

    const onChange = (event) => {
        setcred({ ...cred, [event.target.name]: event.target.value });
    };

    return (
        <div className='d-flex flex-column justify-content-center align-items-center vh-100 border border-primary rounded'>
            <h2 className=''>SIGN UP</h2>
        <div className=''>
            <form onSubmit={handleSubmit}> 
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={cred.name} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={cred.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={cred.password} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Address</label>
                    <input type="text" className="form-control" name='location' value={cred.location} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-success">Submit</button>
                <Link to='/Login' className="btn btn-danger m-3">Existing User</Link>
            </form>
        </div>
        </div>
    );
}
