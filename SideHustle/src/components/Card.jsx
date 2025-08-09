// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";

// // (Your inline icons kept unchanged)
// const HeartIcon = ({ filled = false }) => (
//   <svg className="w-4 h-4" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//   </svg>
// );

// const StarIcon = ({ filled = false }) => (
//   <svg className={`w-3 h-3 ${filled ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
//     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//   </svg>
// );

// const FlashIcon = () => (
//   <svg className="w-3 h-3 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
//     <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
//   </svg>
// );

// const ClockIcon = () => (
//   <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

// const ShoppingBagIcon = () => (
//   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
//   </svg>
// );

// const InfoIcon = () => (
//   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );

// // Sample props used if none passed (keeps component robust)
// const sampleProps = {
//   item: { _id: "1", name: "Margherita Pizza" },
//   foodname: "Margherita Pizza",
//   foodimg: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
//   desc: "Fresh mozzarella, tomato sauce, and basil leaves on a crispy wood-fired crust.",
//   options: [{ quantity: "Small", price: 199 }, { quantity: "Medium", price: 299 }, { quantity: "Large", price: 399 }],
//   viewMode: 'card',
//   email: "user@example.com"
// };

// export default function Card(props = sampleProps) {
//   const buttonRef = useRef(null);
//   const foodItem = props.item || sampleProps.item;
//   const navigate = useNavigate();

//   // local state
//   const [qty, setQty] = useState(1);
//   const [size, setSize] = useState(props.options?.[0]?.quantity || "");
//   const [isLoading, setIsLoading] = useState(false);
//   const [addedToCart, setAddedToCart] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [imageError, setImageError] = useState(false);
//   const [expandedInfo, setExpandedInfo] = useState(false);

//   const priceRef = useRef();

//   // make numeric qty always an integer
//   useEffect(() => {
//     setQty((q) => Math.max(1, parseInt(q, 10) || 1));
//   }, []);

//   // set initial size from props if not set
//   useEffect(() => {
//     if (!size && props.options && props.options.length > 0) {
//       setSize(props.options[0].quantity);
//     }
//   }, [props.options, size]);

//   // create sizeOptions array
//   const options = props.options || [];
//   const sizeOptions = options.map((opt) => ({ quantity: opt.quantity, price: Number(opt.price || 0) }));

//   // finalPrice must be calculated before using it in add-to-cart logic
//   const selectedOption = sizeOptions.find((opt) => opt.quantity === size);
//   const finalPrice = qty * (selectedOption?.price || 0);
//   const originalPrice = finalPrice * 1.25;
//   const discount = finalPrice > 0 ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) : 0;
//   const rating = 4.2 + Math.random() * 0.6;
//   const deliveryTime = Math.floor(Math.random() * 15) + 20;
//   const isTrending = Math.random() > 0.7;
//   const isInCart = false; // you can compute from localStorage if you want

//   // small rating UI
//   const Rating = ({ rating, compact = false }) => (
//     <div className={`flex items-center ${compact ? 'space-x-1' : 'space-x-1.5'}`}>
//       <div className="flex space-x-0.5">
//         {[...Array(5)].map((_, i) => (<StarIcon key={i} filled={i < Math.floor(rating)} />))}
//       </div>
//       <span className={`font-medium ${compact ? 'text-xs text-gray-600' : 'text-sm text-gray-700'}`}>{rating.toFixed(1)}</span>
//     </div>
//   );

//   // ----------- CART HELPERS -----------
//   const readCart = () => {
//     try {
//       const raw = localStorage.getItem('cart') || '[]';
//       const parsed = JSON.parse(raw);
//       if (!Array.isArray(parsed)) return [];
//       return parsed;
//     } catch (e) {
//       console.warn('Failed to read cart from localStorage', e);
//       return [];
//     }
//   };

//   const writeCart = (cart) => {
//     try {
//       localStorage.setItem('cart', JSON.stringify(cart));
//       // notify other parts of the app
//       window.dispatchEvent(new Event('cartUpdated'));
//     } catch (e) {
//       console.error('Failed to write cart to localStorage', e);
//     }
//   };

//   // Main add-to-cart function (robust)
//   const handleADDToCart = async () => {
//     // guard
//     if (!foodItem || !foodItem._id) return;

//     setIsLoading(true);

//     try {
//       // ensure numeric values
//       const safeQty = Math.max(1, parseInt(qty, 10) || 1);
//       const safePrice = Number(finalPrice || 0);
//       const safeSize = size || (sizeOptions[0] && sizeOptions[0].quantity) || '';

//       // read existing cart
//       const cart = readCart();

//       // find item by id + size
//       const index = cart.findIndex(
//         (c) => String(c.id) === String(foodItem._id) && String(c.size) === String(safeSize)
//       );

//       if (index >= 0) {
//         // update existing entry: increment qty and update price per unit if needed
//         cart[index].qty = Number(cart[index].qty || 0) + safeQty;
//         // store last-known unitPrice (we store total price as unitPrice * qty)
//         cart[index].unitPrice = Number(sizeOptions.find(s => s.quantity === safeSize)?.price || cart[index].unitPrice || 0);
//         cart[index].totalPrice = Number(cart[index].unitPrice) * Number(cart[index].qty);
//       } else {
//         // add new item
//         const unitPrice = Number(sizeOptions.find(s => s.quantity === safeSize)?.price || 0);
//         cart.push({
//           id: foodItem._id,
//           name: foodItem.name || props.foodname,
//           size: safeSize,
//           qty: safeQty,
//           unitPrice: unitPrice,
//           totalPrice: unitPrice * safeQty,
//           img: props.foodimg || '',
//         });
//       }

//       // write back
//       writeCart(cart);

//       // UX feedback
//       setAddedToCart(true);
//       setTimeout(() => setAddedToCart(false), 2500);

//     } catch (err) {
//       console.error('Error adding to cart:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Navigate to chat for ask details
//   const handleAsk = () => {
//     try {
//       navigate(`/chat/${foodItem._id}/${props.email || ''}`);
//     } catch (e) {
//       console.error('Navigation failed', e);
//     }
//   };

//   const handleWishlist = () => {
//     setIsWishlisted((s) => !s);
//   };

//   useEffect(() => {
//     if (priceRef.current && !size) {
//       setSize(priceRef.current.value || size);
//     }
//   }, [priceRef, size]);

//   // ---------- RENDER ----------
//   // List view branch kept as-is from your implementation...
//   if (props.viewMode === 'list') {
//     return (
//       <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
//         <div className="flex p-4 space-x-4">
//           <div className="relative flex-shrink-0 w-20 h-20">
//             <div className="relative w-full h-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200">
//               {!imageLoaded && !imageError && (
//                 <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-xl" />
//               )}
//               {imageError ? (
//                 <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 rounded-xl">
//                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//               ) : (
//                 <img
//                   src={props.foodimg}
//                   alt={props.foodname}
//                   className={`w-full h-full object-cover rounded-xl transition-all duration-300 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
//                   onLoad={() => setImageLoaded(true)}
//                   onError={() => setImageError(true)}
//                 />
//               )}

//               {discount > 0 && (
//                 <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-lg">
//                   {discount}%
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex-1 min-w-0">
//             <div className="flex items-start justify-between mb-1">
//               <div className="flex-1 min-w-0">
//                 <h3 className="text-sm font-bold text-gray-900 line-clamp-1 mb-1">{props.foodname}</h3>
//                 <div className="flex items-center space-x-2 mb-2">
//                   <Rating rating={rating} compact />
//                   <div className="flex items-center space-x-1 text-xs text-gray-500">
//                     <ClockIcon />
//                     <span>{deliveryTime}m</span>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 onClick={handleWishlist}
//                 className={`p-1.5 rounded-full transition-all ${isWishlisted ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
//               >
//                 <HeartIcon filled={isWishlisted} />
//               </button>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <select
//                   className="border-0 bg-gray-50 rounded-lg px-2 py-1 text-xs font-medium focus:ring-1 focus:ring-blue-500"
//                   onChange={(e) => setQty(Number(e.target.value))}
//                   value={qty}
//                 >
//                   {Array.from(Array(5), (e, i) => (
//                     <option key={i + 1} value={i + 1}>{i + 1}x</option>
//                   ))}
//                 </select>

//                 <select
//                   className="border-0 bg-gray-50 rounded-lg px-2 py-1 text-xs font-medium focus:ring-1 focus:ring-blue-500"
//                   ref={priceRef}
//                   onChange={(e) => setSize(e.target.value)}
//                   value={size}
//                 >
//                   {sizeOptions.map((opt) => (
//                     <option key={opt.quantity} value={opt.quantity}>{opt.quantity}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <div className="text-right">
//                   <span className="text-sm font-bold text-gray-900">₹{finalPrice}</span>
//                   {discount > 0 && <span className="text-xs text-gray-400 line-through ml-1">₹{Math.round(originalPrice)}</span>}
//                 </div>

//                 <button
//                   onClick={handleAsk}
//                   className="p-1.5 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                   title="Ask Details"
//                 >
//                   <InfoIcon />
//                 </button>
//                 <button
//                   className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${addedToCart ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'} ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
//                   onClick={handleADDToCart}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Adding...' : addedToCart ? 'Added!' : 'Add'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // CARD view (main)
//   return (
//     <div
//       className={`group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden w-72 ${isHovered ? 'transform -translate-y-1' : ''}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
//         {!imageLoaded && !imageError && (
//           <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
//         )}

//         {imageError ? (
//           <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
//             <svg className="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
//             </svg>
//             <span className="text-xs font-medium">No image</span>
//           </div>
//         ) : (
//           <img
//             src={props.foodimg}
//             alt={props.foodname}
//             className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${isHovered ? 'scale-105' : 'scale-100'}`}
//             onLoad={() => setImageLoaded(true)}
//             onError={() => setImageError(true)}
//           />
//         )}

//         <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

//         <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
//           <div className="flex flex-col space-y-1.5">
//             {discount > 0 && (
//               <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm">
//                 {discount}% OFF
//               </div>
//             )}
//             {isTrending && (
//               <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-2 py-1 rounded-full shadow-lg backdrop-blur-sm flex items-center space-x-1">
//                 <FlashIcon />
//                 <span className="text-xs font-semibold">Hot</span>
//               </div>
//             )}
//             {isInCart && (
//               <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm">
//                 In Cart
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handleWishlist}
//             className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${isWishlisted ? 'bg-white/95 text-red-500 scale-110 shadow-lg' : 'bg-white/80 text-gray-600 hover:bg-white/95 hover:text-red-500 hover:scale-105'}`}
//           >
//             <HeartIcon filled={isWishlisted} />
//           </button>
//         </div>

//         <div className="absolute bottom-3 left-3">
//           <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-lg">
//             <div className="flex items-center space-x-1">
//               <StarIcon filled />
//               <span className="text-xs font-bold text-gray-900">{rating.toFixed(1)}</span>
//             </div>
//           </div>
//         </div>

//         <div className="absolute bottom-3 right-3">
//           <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-lg flex items-center space-x-1">
//             <ClockIcon />
//             <span className="text-xs font-bold text-gray-900">{deliveryTime}m</span>
//           </div>
//         </div>
//       </div>

//       <div className="p-4">
//         <div className="mb-3">
//           <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1">{props.foodname}</h3>
//           <div className="flex items-center justify-between">
//             <Rating rating={rating} />
//             <div className="text-right">
//               <div className="flex items-baseline space-x-1">
//                 <span className="text-xl font-bold text-gray-900">₹{finalPrice}</span>
//                 {discount > 0 && <span className="text-sm text-gray-400 line-through">₹{Math.round(originalPrice)}</span>}
//               </div>
//             </div>
//           </div>
//         </div>

//         {props.desc && (
//           <div className="mb-3">
//             <p className={`text-gray-600 text-sm leading-relaxed transition-all duration-300 ${expandedInfo ? 'line-clamp-none' : 'line-clamp-2'}`}>
//               {props.desc}
//             </p>
//             {props.desc.length > 60 && (
//               <button onClick={() => setExpandedInfo(!expandedInfo)} className="text-blue-600 text-xs font-medium mt-1 hover:text-blue-700">
//                 {expandedInfo ? 'Less' : 'More'}
//               </button>
//             )}
//           </div>
//         )}

//         <div className="grid grid-cols-2 gap-2 mb-3">
//           <div>
//             <label className="block text-xs font-semibold text-gray-900 mb-1">Qty</label>
//             <div className="flex items-center bg-gray-50 rounded-lg overflow-hidden">
//               <button onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1} className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
//                 <svg className="w-6 h-6 rounded-lg bg-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
//               </button>
//               <span className="px-2 py-1.5 text-sm border-2 text-center text-gray-700 font-bold bg-gray-50 min-w-[2rem] border-x border-gray-200">{qty}</span>
//               <button onClick={() => setQty(Math.min(10, qty + 1))} disabled={qty >= 10} className="py-1.5 px-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
//                 <svg className="w-6 h-6 rounded-lg bg-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
//               </button>
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-semibold text-gray-700 mb-1">Size</label>
//             <select className="w-full border-2 text-center text-gray-700 bg-gray-50 rounded-lg px-2 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" ref={priceRef} onChange={(e) => setSize(e.target.value)} value={size}>
//               {sizeOptions.map((opt) => (<option key={opt.quantity} value={opt.quantity}>{opt.quantity}</option>))}
//             </select>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <button className={`w-full py-2.5 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${addedToCart ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl'} ${isLoading ? 'opacity-75 cursor-not-allowed' : 'transform hover:scale-[1.02]'}`} onClick={handleADDToCart} disabled={isLoading} ref={buttonRef}>
//             {isLoading ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 <span>Adding...</span>
//               </>
//             ) : addedToCart ? (
//               <>
//                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
//                 <span>Added!</span>
//               </>
//             ) : (
//               <>
//                 <ShoppingBagIcon />
//                 <span></span>
//               </>
//             )}
//           </button>

//           <button onClick={handleAsk} className="w-full py-2 px-4 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-sm flex items-center justify-center space-x-2">
//             <InfoIcon />
//             <span>Ask Details</span>
//           </button>
//         </div>
//       </div>

//       {isLoading && (
//         <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center rounded-2xl">
//           <div className="flex flex-col items-center space-y-2">
//             <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
//             <p className="text-sm font-medium text-gray-700">Adding...</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, useDispatchCart } from './contextReducer';

// Modern Icons
const HeartIcon = ({ filled = false }) => (
  <svg className="w-4 h-4" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const StarIcon = ({ filled = false }) => (
  <svg className={`w-3 h-3 ${filled ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const FlashIcon = () => (
  <svg className="w-3 h-3 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function Card(props) {
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const foodItem = props.item;
  let data = useCart();
  let dispatch = useDispatchCart();
  
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(props.options[0]?.quantity || "");
  const [isLoading, setIsLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [expandedInfo, setExpandedInfo] = useState(false);
  
  const priceRef = useRef();

  const handleADDToCart = async () => {
    setIsLoading(true);
    let food = [];

    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        break;
      }
    }

    try {
      if (food.length > 0) {
        if (food.size === size) {
          await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty });
        } else if (food.size !== size) {
          await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodimg });
        }
      } else {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodimg });
      }

      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2500);
      window.dispatchEvent(new Event('cartUpdated'));
      
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAsk = () => {
    navigate(`/chat/${props.item._id}/${props.email}`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, []);

  let options = props.options;
  const sizeOptions = options.map((opt) => ({
    quantity: opt.quantity,
    price: opt.price,
  }));

  const finalPrice = qty * (sizeOptions.find((opt) => opt.quantity === size)?.price || 0);
  const originalPrice = finalPrice * 1.25;
  const discount = Math.round(((originalPrice - finalPrice) / originalPrice) * 100);
  const isInCart = data.some(item => item.id === foodItem._id);
  const rating = 4.2 + Math.random() * 0.6; // Random rating between 4.2-4.8
  const deliveryTime = Math.floor(Math.random() * 15) + 20; // 20-35 mins
  const isTrending = Math.random() > 0.7; // 30% chance to be trending

  // Enhanced Rating Component
  const Rating = ({ rating, compact = false }) => (
    <div className={`flex items-center ${compact ? 'space-x-1' : 'space-x-1.5'}`}>
      <div className="flex space-x-0.5">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} filled={i < Math.floor(rating)} />
        ))}
      </div>
      <span className={`font-medium ${compact ? 'text-xs text-gray-600' : 'text-sm text-gray-700'}`}>
        {rating.toFixed(1)}
      </span>
    </div>
  );

  // List View - Ultra Modern
  if (props.viewMode === 'list') {
    return (
      <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden backdrop-blur-sm">
        <div className="flex p-3 space-x-4">
          {/* Image with Glassmorphism Effect */}
          <div className="relative flex-shrink-0 w-24 h-24">
            <div className="relative w-full h-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
              )}
              {imageError ? (
                <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              ) : (
                <img
                  src={props.foodimg}
                  alt={props.foodname}
                  className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              )}
              
              {/* Floating Badges */}
              <div className="absolute -top-1 -right-1 flex flex-col space-y-1">
                {discount > 0 && (
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    {discount}%
                  </div>
                )}
                {isTrending && (
                  <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-1 rounded-full shadow-lg">
                    <FlashIcon />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content with Modern Layout */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-gray-900 line-clamp-1 mb-1">{props.foodname}</h3>
                  <div className="flex items-center space-x-3">
                    <Rating rating={rating} compact />
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <ClockIcon />
                      <span>{deliveryTime} mins</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleWishlist}
                  className={`p-1.5 rounded-full transition-all ${isWishlisted ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
                >
                  <HeartIcon filled={isWishlisted} />
                </button>
              </div>

              {/* Quick Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <label className="text-xs font-medium text-gray-900">Qty:</label>
                    <select 
                      className="border-0 bg-gray-50 rounded-lg px-2 py-1 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setQty(e.target.value)} 
                      value={qty}
                    >
                      {Array.from(Array(10), (e, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-1">
                    <label className="text-xs font-medium text-gray-900">Size:</label>
                    <select 
                      className="border-0 bg-gray-50 rounded-lg px-2 py-1 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                      ref={priceRef} 
                      onChange={(e) => setSize(e.target.value)} 
                      value={size}
                    >
                      {sizeOptions.map((opt) => (
                        <option key={opt.quantity} value={opt.quantity}>{opt.quantity}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-lg font-bold text-gray-900">₹{finalPrice}</span>
                      {discount > 0 && (
                        <span className="text-sm text-gray-400 line-through">₹{Math.round(originalPrice)}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-1">
                    <button
                      onClick={handleAsk}
                      className="p-2 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Ask Details"
                    >
                      <InfoIcon />
                    </button>
                    <button
                      className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                        addedToCart 
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                          : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                      } ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                      onClick={handleADDToCart}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Adding...' : addedToCart ? 'Added!' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Card View - Complete Modern Redesign
  return (
    <div 
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden max-w-sm ${
        isHovered ? 'transform -translate-y-2 shadow-2xl' : ''
      }`}
      style={{
        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Modern Effects */}
      <div className="relative aspect-w-16 aspect-h-10 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        )}
        
        {imageError ? (
          <div className="flex items-center justify-center w-full h-36 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        ) : (
          <img
            src={props.foodimg}
            alt={props.foodname}
            className={`w-full h-36 object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}

        {/* Floating Elements */}
        <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start">
          {/* Left Badges */}
          <div className="flex flex-col space-y-2">
            {discount > 0 && (
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                {discount}% OFF
              </div>
            )}
            {isTrending && (
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-2 py-1 rounded-full shadow-lg backdrop-blur-sm flex items-center space-x-1">
                <FlashIcon />
                <span className="text-xs font-semibold">Trending</span>
              </div>
            )}
            {isInCart && (
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                In Cart
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
              isWishlisted 
                ? 'bg-red-500/20 text-red-500 scale-110' 
                : 'bg-white/20 text-white hover:bg-white/30 hover:text-red-500'
            }`}
          >
            <HeartIcon filled={isWishlisted} />
          </button>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content with Glass Effect */}
      <div className="p-4 relative">
        {/* Header */}
        <div className="mb-3">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900 line-clamp-1 flex-1">{props.foodname}</h1>
          </div>
        </div>


        {/* Modern Controls */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Quantity with Modern Stepper */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center bg-gray-50 rounded-xl overflow-hidden">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                disabled={qty <= 1}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-6 h-6 rounded-2xl bg-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="px-3 py-2 text-sm font-bold text-black bg-white min-w-[2.5rem] text-center border-x border-gray-200">{qty}</span>
              <button
                onClick={() => setQty(Math.min(10, qty + 1))}
                disabled={qty >= 10}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-6 h-6 rounded-2xl bg-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Size</label>
            <select
              className="w-full border border-gray-800 text-black bg-gray-50 rounded-xl px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
              value={size}
            >
              {sizeOptions.map((opt) => (
                <option key={opt.quantity} value={opt.quantity}>{opt.quantity}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Modern Action Buttons */}
        <div className="space-y-2">
          <button
            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              addedToCart
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg'
                : 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white shadow-lg hover:shadow-xl'
            } ${isLoading ? 'opacity-75 cursor-not-allowed' : 'transform hover:scale-105'}`}
            onClick={handleADDToCart}
            disabled={isLoading}
            ref={buttonRef}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Adding...</span>
              </>
            ) : addedToCart ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Added to Wishlist!</span>
              </>
            ) : (
              <>
                <HeartIcon filled={true} />
                <span>Add to Wishlist</span>
              </>
            )}
          </button>

          <button
            onClick={handleAsk}
            className="w-full py-2.5 px-4 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-sm flex items-center justify-center space-x-2"
          >
            <InfoIcon />
            <span>Ask for Details</span>
          </button>
        </div>
      </div>

      {/* Premium Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center rounded-2xl">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-gray-700">Adding to cart...</p>
          </div>
        </div>
      )}
    </div>
  );
}