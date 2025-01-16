import React, { useState, useEffect } from 'react';
import Fotter from '../components/Fotter';
import Navbar from '../components/Navbar';
import Yourcard from '../components/Yourcard';
import { Modal, Button, Form } from 'react-bootstrap';

export default function AddProduct() {
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [myProducts, setMyProducts] = useState([]); // Fetched products data
    const [productDetails, setProductDetails] = useState({
        name: '',
        CategoryName: '',
        img: '',
        pincode: '',
        options: [{ quantity: '1', price: '' }]
    });

    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setProductDetails({
            name: '',
            CategoryName: '',
            pincode: '',
            img: '',
            options: [{ quantity: '1', price: '' }]
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({ ...productDetails, [name]: value });
    };

    const handleQuantityChange = (index, e) => {
        const { name, value } = e.target;
        const updatedOptions = [...productDetails.options];
        updatedOptions[index][name] = value;
        setProductDetails({ ...productDetails, options: updatedOptions });
    };

    const addQuantity = () => {
        setProductDetails({
            ...productDetails,
            options: [...productDetails.options, { quantity: '1', price: '' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('userEmail');
        if (!email) return alert("User email not found.");

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/AddProduct`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...productDetails, email })
            });

            const result = await response.json();
            if (!result.success) {
                alert("Invalid details");
            } else {
                alert("Product added successfully");
                loadData(); // Refresh product list
            }
            handleClose();
        } catch (error) {
            console.error("Error submitting product details:", error);
            alert("Failed to submit product details. Please try again.");
        }
    };

    const loadData = async () => {
        const email = localStorage.getItem('userEmail');
        if (!email) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/myproducts`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const result = await response.json();
            setMyProducts(result.mydata || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="d-flex justify-content-between m-3">
                <h1>Your Products</h1>
                <button className="btn btn-primary" onClick={handleShow}>
                    <i className="bi bi-plus-circle"></i> Add New
                </button>
            </div>

            {/* Product Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Product Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={productDetails.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="CategoryName"
                                value={productDetails.CategoryName}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="url"
                                name="img"
                                value={productDetails.img}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control
                                type="number"
                                name="pincode"
                                value={productDetails.pincode}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Label>Options and Prices</Form.Label>
                        {productDetails.options.map((item, index) => (
                            <div key={index} className="d-flex mb-3">
                                <Form.Control
                                    as="select"
                                    name="quantity"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(index, e)}
                                    className="me-2"
                                >
                                    <option value="1">1</option>
                                    <option value="half">Half</option>
                                    <option value="full">Full</option>
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                </Form.Control>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={item.price}
                                    onChange={(e) => handleQuantityChange(index, e)}
                                    required
                                />
                            </div>
                        ))}
                        <Button variant="secondary" onClick={addQuantity}>
                            <i className="bi bi-plus-circle"></i> Add Option
                        </Button>
                        <Button type="submit" variant="primary" className="mt-3">
                            Save Product
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>

            <div className="m-3">
                 
            <div className="m-3">
    {myProducts.length > 0 ? (
        myProducts.map((product) => (
            <Yourcard
                key={product._id || product.id || Math.random()} 
                item={product}
            />
        ))
    ) : (
        <p>No products available.</p>
    )}
</div>
    
            </div>
            <Fotter />
        </div>
    );
}
