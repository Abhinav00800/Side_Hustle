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
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/myproducts/${email}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },

            });
            const result = await response.json();
            console.log(result);
            setMyProducts(result.mydata || []);
            // console.log(myProducts);
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
            <div className="d-flex justify-content-between align-items-center m-3">
                <div className='m-4 text-center' style={{ fontFamily: "Bodoni", fontWeight: "bold", color: " rgb(197, 170, 106)" }}>

                    <h1 className="font-weight-bold text-buttonbg">Your Products</h1>
                </div>
                <button
                    className="buttonbg d-flex justify-content-end align-items-center px-3 py-2"
                    onClick={handleShow}
                    style={{ borderRadius: '1rem' }}
                >
                    <i className="bi bi-plus-circle me-2"></i> Add New
                </button>
            </div>
            <hr />


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
                                as="select"
                                name="CategoryName"
                                value={productDetails.CategoryName}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="Food">Food</option>
                                <option value="Home Made Items">Home Made Items</option>
                                <option value="Toys">Toys</option>
                                <option value="Cakes">Cakes</option>
                                <option value="Miscellaneous">Miscellaneous</option>
                            </Form.Control>

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
                        <div className='d-flex justify-content-between align-items-center'>

                            <Button className="buttonbg" onClick={addQuantity}>
                                <i className="bi bi-plus-circle"></i> Add Option
                            </Button>
                            <Button type="submit" className="mt-3 buttonbg">
                                Save Product
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>



            <div className="m-3 d-flex flex-wrap justify-content-start">
                {myProducts.length > 0 ? (
                    myProducts.map((product) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <Yourcard
                                key={product._id || product.id || Math.random()}
                                name={product.name}
                                options={product.options}
                                img={product.img}
                            />
                        </div>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>

            <Fotter />
        </div>
    );
}
