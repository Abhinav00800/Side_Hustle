import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "../model";
import Cart from "../Screens/Cart";
import pic3 from "../Images/OnDemandpic.jpg";

// Icons
import { 
  HiOutlineHome, 
  HiOutlineTag, 
  HiOutlineShoppingCart, 
  HiOutlineUserCircle, 
  HiOutlineLogout, 
  HiOutlineCog, 
  HiOutlinePlusCircle, 
  HiOutlineChatAlt2, 
  HiOutlineCube,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineChevronDown
} from "react-icons/hi";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("authToken");

  // Scroll effect with optimized performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart count update
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItemCount(cart.length);
    };
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.account-dropdown')) {
        setShowAccountDropdown(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("cart");
    setShowAccountDropdown(false);
    setShowMobileMenu(false);
    navigate("/");
  };

  const navItems = [
    {
      path: "/home",
      label: "Home",
      icon: <HiOutlineHome className="w-5 h-5" />,
    },
    {
      path: "/Categories",
      label: "Categories",
      icon: <HiOutlineTag className="w-5 h-5" />,
    },
    ...(isAuthenticated
      ? [
          {
            path: "/myOrder",
            label: "My Orders",
            icon: <HiOutlineCube className="w-5 h-5" />,
          },
          {
            path: "/addproduct",
            label: "Add Product",
            icon: <HiOutlinePlusCircle className="w-5 h-5" />,
          },
        ]
      : []),
  ];

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" 
            : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 group transition-transform hover:scale-105"
            >
              <div className="relative">
                <img 
                  src={pic3} 
                  alt="SideHustleHub" 
                  className="w-10 h-10 rounded-lg object-cover shadow-sm ring-2 ring-yellow-100 group-hover:ring-yellow-200 transition-all" 
                />
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent hidden sm:block">
                SideHustleHub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActiveRoute(item.path)
                      ? "bg-yellow-50 text-yellow-700 shadow-sm ring-1 ring-yellow-200"
                      : "text-gray-700 hover:bg-gray-50 hover:text-yellow-600"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Desktop User Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {!isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-yellow-700 hover:text-yellow-800 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white text-sm font-medium rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  {/* Cart Button */}
                  <button
                    onClick={() => setCartView(true)}
                    className="relative p-2.5 rounded-lg hover:bg-gray-100 transition-colors group"
                    title="Shopping Cart"
                  >
                    <HiOutlineShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-yellow-600 transition-colors" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                        {cartItemCount > 9 ? "9+" : cartItemCount}
                      </span>
                    )}
                  </button>

                  {/* Account Dropdown */}
                  <div className="relative account-dropdown">
                    <button
                      onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <HiOutlineUserCircle className="w-6 h-6 text-gray-700" />
                      <span className="text-sm font-medium text-gray-700 hidden xl:block">Account</span>
                      <HiOutlineChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showAccountDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {showAccountDropdown && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">Your Account</p>
                          <p className="text-xs text-gray-500">Manage your settings</p>
                        </div>
                        
                        <div className="py-1">
                          <Link
                            to="/profile"
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setShowAccountDropdown(false)}
                          >
                            <HiOutlineUserCircle className="w-4 h-4" />
                            <span>Profile Settings</span>
                          </Link>
                          <Link
                            to="/settings"
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setShowAccountDropdown(false)}
                          >
                            <HiOutlineCog className="w-4 h-4" />
                            <span>Preferences</span>
                          </Link>
                        </div>
                        
                        <div className="border-t border-gray-100 py-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <HiOutlineLogout className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {showMobileMenu ? (
                <HiOutlineX className="w-6 h-6 text-gray-700" />
              ) : (
                <HiOutlineMenu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-80 bg-white shadow-xl transform z-50 transition-transform duration-300 ease-out lg:hidden ${
          showMobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <img src={pic3} alt="OnDemand" className="w-8 h-8 rounded-lg object-cover" />
            <span className="font-bold text-lg text-yellow-700">OnDemand</span>
          </div>
          <button
            onClick={() => setShowMobileMenu(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <HiOutlineX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <div className="py-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setShowMobileMenu(false)}
              className={`flex items-center space-x-3 px-6 py-3 text-base font-medium transition-colors ${
                isActiveRoute(item.path)
                  ? "bg-yellow-50 text-yellow-700 border-r-2 border-yellow-600"
                  : "text-gray-800 hover:bg-gray-50"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Mobile User Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gray-50">
          {!isAuthenticated ? (
            <div className="space-y-3">
              <Link
                to="/login"
                className="block w-full px-4 py-3 text-center text-yellow-700 font-medium border border-yellow-300 rounded-lg hover:bg-yellow-50 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block w-full px-4 py-3 text-center text-white font-mediumbg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition-all"
                onClick={() => setShowMobileMenu(false)}
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-800 hover:bg-white rounded-lg transition-colors"
                onClick={() => {
                  setCartView(true);
                  setShowMobileMenu(false);
                }}
              >
                <div className="flex items-center space-x-3">
                  <HiOutlineShoppingCart className="w-5 h-5" />
                  <span>Shopping Cart</span>
                </div>
                {cartItemCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </span>
                )}
              </button>
              
              <Link
                to="/profile"
                className="flex items-center space-x-3 w-full px-4 py-3 text-gray-800 hover:bg-white rounded-lg transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                <HiOutlineUserCircle className="w-5 h-5" />
                <span>Profile Settings</span>
              </Link>
              
              <Link
                to="/settings"
                className="flex items-center space-x-3 w-full px-4 py-3 text-gray-800 hover:bg-white rounded-lg transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                <HiOutlineCog className="w-5 h-5" />
                <span>Preferences</span>
              </Link>
              
              <button
                className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                onClick={() => {
                  setShowMobileMenu(false);
                  handleLogout();
                }}
              >
                <HiOutlineLogout className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cart Modal */}
      {cartView && (
        <Modal onClose={() => setCartView(false)}>
          <Cart />
        </Modal>
      )}

      {/* Floating Chat Button */}
      <Link
        to="/chatbot"
        className="fixed right-6 bottom-6 w-14 h-14 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40 hover:scale-110 group"
        title="Need Help? Chat with us"
      >
        <HiOutlineChatAlt2 className="w-6 h-6" />
        <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-30 animate-ping group-hover:animate-pulse" />
      </Link>
    </>
  );
}
