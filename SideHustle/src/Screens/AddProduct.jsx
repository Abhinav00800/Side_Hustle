import React, { useState, useEffect } from 'react';
import Fotter from '../components/Fotter';
import Navbar from '../components/Navbar';
import Yourcard from '../components/Yourcard';

export default function AddProduct() {
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [myProducts, setMyProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: '',
        CategoryName: '',
        img: '',
        pincode: '',
        options: [{ quantity: '1', price: '' }]
    });

    const categories = [
        { value: '', label: 'Select Category' },
        { value: 'Food', label: '🍕 Food' },
        { value: 'Home Made Items', label: '🏠 Home Made Items' },
        { value: 'Toys', label: '🧸 Toys' },
        { value: 'Cakes', label: '🎂 Cakes' },
        { value: 'Miscellaneous', label: '📦 Miscellaneous' }
    ];

    const quantityOptions = [
        { value: '1', label: '1 Piece' },
        { value: 'half', label: 'Half' },
        { value: 'full', label: 'Full' },
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' }
    ];

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

    const removeQuantity = (index) => {
        if (productDetails.options.length > 1) {
            const updatedOptions = productDetails.options.filter((_, i) => i !== index);
            setProductDetails({ ...productDetails, options: updatedOptions });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('userEmail');
        if (!email) {
            alert("User email not found.");
            return;
        }

        setSubmitting(true);
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
                loadData();
            }
            handleClose();
        } catch (error) {
            console.error("Error submitting product details:", error);
            alert("Failed to submit product details. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const loadData = async () => {
        const email = localStorage.getItem('userEmail');
        if (!email) return;

        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/myproducts/${email}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
            });
            const result = await response.json();
            setMyProducts(result.mydata || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const filteredProducts = myProducts.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'serif' }}>
                            Add your own Products
                        </h1>
                        <button
                            onClick={handleShow}
                            className="inline-flex items-center bg-white text-amber-700 font-semibold py-3 px-8 rounded-full hover:bg-amber-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add New Product
                        </button>
                    </div>
                </div>
            </div>

            {/* Search Section */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="max-w-md mx-auto">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="search"
                                placeholder="Search your products..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div className="container mx-auto px-4 py-12">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-200 border-t-amber-600"></div>
                        <span className="ml-3 text-gray-600">Loading your products...</span>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to load products</h3>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <button
                            onClick={loadData}
                            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                        >
                            Try Again
                        </button>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {search ? `Search Results (${filteredProducts.length})` : `Your Products (${myProducts.length})`}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product, index) => (
                                <div
                                    key={product._id || product.id || index}
                                    className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                                >
                                    <Yourcard
                                        name={product.name}
                                        options={product.options}
                                        img={product.img}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            {search ? 'No products found' : 'No products yet'}
                        </h3>
                        <p className="text-gray-600 mb-8 text-lg">
                            {search ?
                                `No products match "${search}". Try a different search term.` :
                                'Start by adding your first product to showcase your offerings!'
                            }
                        </p>
                        {!search && (
                            <button
                                onClick={handleShow}
                                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-full transition duration-200 transform hover:scale-105 shadow-lg"
                            >
                                Add Your First Product
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
                            <button
                                onClick={handleClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Product Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={productDetails.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="CategoryName"
                                    value={productDetails.CategoryName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                    required
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Image URL *
                                </label>
                                <input
                                    type="url"
                                    name="img"
                                    value={productDetails.img}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                    placeholder="https://example.com/image.jpg"
                                    required
                                />
                            </div>

                            {/* Pincode */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Pincode *
                                </label>
                                <input
                                    type="number"
                                    name="pincode"
                                    value={productDetails.pincode}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                    placeholder="Enter pincode"
                                    required
                                />
                            </div>

                            {/* Options and Prices */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4">
                                    Product Options & Prices *
                                </label>
                                <div className="space-y-3">
                                    {productDetails.options.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                            <select
                                                name="quantity"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(index, e)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                            >
                                                {quantityOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="flex-1 relative">
                                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    placeholder="Price"
                                                    value={item.price}
                                                    onChange={(e) => handleQuantityChange(index, e)}
                                                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                                    required
                                                />
                                            </div>
                                            {productDetails.options.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeQuantity(index)}
                                                    className="text-red-600 hover:text-red-800 p-2"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={addQuantity}
                                    className="mt-3 flex items-center text-amber-600 hover:text-amber-700 font-medium transition-colors"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Another Option
                                </button>
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Save Product
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Fotter />
        </div>
    );
}
