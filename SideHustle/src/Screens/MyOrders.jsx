import React, { useEffect, useState } from "react";
import Fotter from "../components/Fotter";
import Navbar from "../components/Navbar";
import { FaCalendarAlt, FaBoxOpen, FaRedoAlt } from "react-icons/fa";

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      setError("Please log in to view your orders");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/myorderData`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch order data");

      const data = await response.json();
      setOrderData(data.orderData);
    } catch (error) {
      console.error("Error fetching order data:", error);
      setError("Failed to load your orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getOrderTotal = (orderGroup) =>
    orderGroup.slice(1).reduce((total, item) => total + parseFloat(item.price), 0);

  const getOrderItemsCount = (orderGroup) =>
    orderGroup.slice(1).reduce((count, item) => count + parseInt(item.qty), 0);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex flex-col flex-1 items-center justify-center text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-amber-300 border-t-amber-700 mb-3"></div>
          <p className="text-gray-600 text-sm">Loading your orders...</p>
        </div>
        <Fotter />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex flex-col flex-1 items-center justify-center px-4">
          <div className="bg-white shadow-md rounded-lg p-5 max-w-sm text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              ⚠️
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can't load orders
            </h3>
            <p className="text-gray-600 text-sm mb-4">{error}</p>
            <button
              onClick={fetchMyOrder}
              className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-4 rounded-lg text-sm font-medium transition"
            >
              Try Again
            </button>
          </div>
        </div>
        <Fotter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white py-3 shadow">
        <div className="relative container mx-auto mt-10 px-4 py-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight" style={{fontFamily: 'serif'}}>
            My Orders
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Track and reorder your past purchases
          </p>
          <div className="mt-4 w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Orders */}
      <div className="container mx-auto px-4 py-6 flex-1">
        {orderData && orderData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {orderData.map((orderGroup, index) => {
              const orderTotal = getOrderTotal(orderGroup);
              const itemsCount = getOrderItemsCount(orderGroup);

              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  {/* Header */}
                  <div className="bg-amber-50 px-4 py-3 border-b flex justify-between items-center">
                    <div>
                      <h2 className="text-sm font-semibold text-gray-900">
                        Order #{index + 1}
                      </h2>
                      <div className="text-gray-500 text-xs flex items-center gap-1">
                        <FaCalendarAlt className="text-amber-600" />{" "}
                        {formatDate(orderGroup[0].order_date)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-amber-700">
                        ₹{orderTotal.toFixed(0)}
                      </div>
                      <div className="text-xs text-gray-600">{itemsCount} items</div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="p-3 space-y-2">
                    {orderGroup.slice(1, 4).map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="bg-gray-50 rounded p-2 border flex justify-between items-center text-xs"
                      >
                        <span className="font-medium text-gray-900 truncate w-3/4">
                          {item.name.length > 22
                            ? item.name.substring(0, 22) + "..."
                            : item.name}
                        </span>
                        <span className="font-semibold text-amber-700">
                          ₹{parseFloat(item.price).toFixed(0)}
                        </span>
                      </div>
                    ))}
                    {orderGroup.slice(1).length > 3 && (
                      <p className="text-center text-xs text-gray-500">
                        +{orderGroup.slice(1).length - 3} more items
                      </p>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="bg-gray-50 px-4 py-2 border-t flex justify-between items-center">
                    <span className="text-green-700 bg-green-100 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
                      <FaBoxOpen /> Delivered
                    </span>
                    <button className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition">
                      <FaRedoAlt /> Reorder
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-12">
            <img
              src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
              alt="No orders"
              className="w-20 mx-auto mb-4 opacity-90"
            />
            <h3 className="text-lg font-semibold text-gray-900">
              No orders yet
            </h3>
            <p className="text-gray-600 text-sm mb-5">
              Start shopping now and your orders will appear here.
            </p>
            <a
              href="/categories"
              className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-full font-medium text-sm shadow"
            >
              🛒 Order Now
            </a>
          </div>
        )}
      </div>

      <Fotter />
    </div>
  );
}
