import React, { useState, useRef, useEffect } from "react";
import { useCart, useDispatchCart } from "./contextReducer";

export default function Card(props) {
  const [qty] = useState(1); // same as original
  const [size, setSize] = useState(props.options[0]?.quantity || "");
  const priceRef = useRef();

  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, []);

  const options = props.options || [];

  const sizeOptions = options.map((opt) => ({
    quantity: opt.quantity,
    price: opt.price,
  }));

  const finalPrice =
    qty * (sizeOptions.find((opt) => opt.quantity === size)?.price || 0);

  return (
    <div className="flex justify-center">
      <div
        className="w-72 bg-white/90 backdrop-blur-lg rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl hover:border-amber-400 transition-all duration-300 ease-out transform hover:-translate-y-2 overflow-hidden group"
        role="article"
        aria-label={`Product card for ${props.name}`}
      >
        {/* Image */}
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={props.img}
            alt={props.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Badge */}
          <div className="absolute top-3 left-3 bg-amber-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
            Best Seller
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Product Name */}
          <h3
            className="text-sm text-gray-900 md:text-base font-semibold truncate cursor-pointer transition-colors duration-200 group-hover:text-amber-600"
            title={props.name}
          >
            {props.name}
          </h3>

          {/* Size & Price Row */}
          <div className="flex items-center justify-between gap-3">
            {/* Size selector */}
            <select
              ref={priceRef}
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="flex-1 text-black py-2 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
              aria-label="Choose size"
            >
              {sizeOptions.map((opt) => (
                <option key={opt.quantity} value={opt.quantity}>
                  {opt.quantity}
                </option>
              ))}
            </select>

            {/* Price */}
            <div className="text-right">
              <div className="text-xs text-gray-800">Price</div>
              <div className="text-lg font-bold text-amber-600">
                ₹{Number(finalPrice).toFixed(0)}
              </div>
            </div>
          </div>

          {/* Qty & Reorder */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="px-2 py-1 bg-gray-200 rounded-full">
                Qty {qty}x
              </span>
              <span className="px-2 py-1 bg-gray-200 rounded-full">
                {size || "—"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
