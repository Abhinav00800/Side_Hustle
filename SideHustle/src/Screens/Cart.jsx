import React from "react";
import { useCart, useDispatchCart } from "../components/contextReducer";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  if (!data || data.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center">
          <div className="mx-auto mb-4 w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center text-3xl">
            🛒
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            The Cart is Empty!
          </h2>
          <p className="text-sm text-gray-500">
            Browse items and add them to your cart.
          </p>
          <a
            href="/categories"
            className="inline-block mt-4 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full text-sm shadow"
          >
            🛍️ Shop Now
          </a>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    const userEmail = localStorage.getItem("userEmail");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/orderData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_data: data,
            email: userEmail,
            order_date: new Date().toDateString(),
          }),
        }
      );

      if (response.ok) {
        dispatch({ type: "DROP" });
        navigate("/myOrder");
      } else {
        console.error(
          "Failed to checkout:",
          response.status,
          await response.text()
        );
        // you could show a toast here
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      // you could show a toast here
    }
  };

  const totalPrice = data.reduce((total, food) => total + Number(food.price), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Items list - spans 8/12 on lg */}
          <div className="lg:col-span-8 space-y-4">
            {data.map((food, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                {/* Optional small thumbnail if available (keeps no new field) */}
                <div className="flex-shrink-0 w-full sm:w-28 h-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  {/* If your items have images, replace the emoji with <img src={food.img} /> */}
                  <span className="text-2xl">🍽️</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="truncate">
                      <div
                        className="text-base font-semibold text-gray-900 truncate"
                        title={food.name}
                      >
                        {food.name}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        <span className="inline-block mr-3">
                          <span className="font-medium text-gray-700">Qty:</span>{" "}
                          {food.qty}
                        </span>
                        <span>
                          <span className="font-medium text-gray-700">Option:</span>{" "}
                          {food.size}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-500">Amount</div>
                      <div className="text-lg font-bold text-amber-600">
                        ₹{Number(food.price).toFixed(0)}
                      </div>
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                      Item #{index + 1}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          dispatch({ type: "REMOVE", index: index })
                        }
                        aria-label={`Remove ${food.name} from cart`}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 transition"
                        title="Remove"
                      >
                        {/* clean inline SVG delete icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-red-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H3.5A1.5 1.5 0 002 5.5V6a1 1 0 001 1h14a1 1 0 001-1v-.5A1.5 1.5 0 0016.5 4H15V3a1 1 0 00-1-1H6zm2 6a1 1 0 10-2 0v7a1 1 0 102 0V8zm6 0a1 1 0 10-2 0v7a1 1 0 102 0V8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary / Checkout - spans 4/12 on lg */}
          <aside className="lg:col-span-4">
            <div className="sticky top-6 space-y-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Order Summary
                </h2>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Items</span>
                  <span>{data.length}</span>
                </div>

                <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toFixed(0)}</span>
                </div>

                {/* Spacer */}
                <div className="border-t border-dashed border-gray-200 my-4"></div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Total</div>
                    <div className="text-2xl font-bold text-amber-600">
                      ₹{totalPrice.toFixed(0)}
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full shadow-md text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-amber-300"
                    aria-label="Proceed to checkout"
                  >
                    Checkout
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h12l-2-7M10 21a1 1 0 100-2 1 1 0 000 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Small help / note */}
              <div className="bg-white rounded-lg p-3 text-sm text-gray-500 shadow-sm">
                <div className="font-medium text-gray-700 mb-1">Need help?</div>
                <div>If something went wrong during checkout, check your network or try again later.</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
