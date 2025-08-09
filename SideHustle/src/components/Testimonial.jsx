import React, { useState, useEffect } from "react";
import pic1 from "../Images/image1.jpg";
import pic2 from "../Images/image2.jpg";
import pic3 from "../Images/OnDemandpic.jpg";

// Quote Icon Component
const QuoteIcon = () => (
  <svg className="w-6 h-6 text-blue-200 mb-3" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
  </svg>
);

// Star Rating Component
const StarRating = ({ rating = 5 }) => (
  <div className="flex justify-center space-x-1 mb-3">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

function Testimonial() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      image: pic1,
      name: "Sarah Johnson",
      role: "Small Business Owner",
      location: "New York, NY",
      rating: 5,
      text: "OnDemand has transformed how I manage my business. The interface is intuitive and saves me hours every week.",
      highlight: "Transformed my business"
    },
    {
      id: 2,
      image: pic2,
      name: "Michael Chen",
      role: "Freelance Designer",
      location: "San Francisco, CA",
      rating: 5,
      text: "The convenience and reliability have been game-changing. Everything is streamlined and professional.",
      highlight: "Game-changer for my career"
    },
    {
      id: 3,
      image: pic3,
      name: "Emily Rodriguez",
      role: "Restaurant Manager",
      location: "Austin, TX",
      rating: 5,
      text: "Every interaction leaves me feeling valued. Their attention to detail and customer service is unmatched.",
      highlight: "Unmatched service"
    }
  ];

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              What Our Customers
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover how OnDemand has helped thousands of businesses achieve their goals.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center space-x-6 mt-6">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">10k+</div>
              <div className="text-xs text-gray-500">Happy Customers</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-600">4.9/5</div>
              <div className="text-xs text-gray-500">Average Rating</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">99%</div>
              <div className="text-xs text-gray-500">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Desktop View - Three Smaller Cards */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden max-w-sm mx-auto"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-0.5">
                <div className="w-full h-full bg-white rounded-xl"></div>
              </div>
              
              <div className="relative p-6">
                {/* Quote Icon */}
                <div className="absolute top-3 right-3 opacity-10">
                  <QuoteIcon />
                </div>

                {/* Profile Section */}
                <div className="text-center mb-4">
                  <div className="relative inline-block">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md mx-auto group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mt-3 mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-blue-600 font-medium text-sm">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>

                {/* Rating */}
                <StarRating rating={testimonial.rating} />

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 text-center text-sm leading-relaxed mb-3 line-clamp-3">
                  "{testimonial.text}"
                </blockquote>

                {/* Highlight */}
                <div className="text-center">
                  <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-medium rounded-full">
                    {testimonial.highlight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet View - Compact Carousel */}
        <div className="lg:hidden">
          <div className="relative max-w-lg mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6">
                {/* Quote Icon */}
                <div className="flex justify-center mb-4">
                  <QuoteIcon />
                </div>

                {/* Profile Section */}
                <div className="text-center mb-4">
                  <img
                    src={testimonials[activeSlide].image}
                    alt={testimonials[activeSlide].name}
                    className="w-20 h-20 rounded-full object-cover border-3 border-white shadow-md mx-auto mb-3"
                  />
                  
                  <h4 className="text-xl font-semibold text-gray-900 mb-1">
                    {testimonials[activeSlide].name}
                  </h4>
                  <p className="text-blue-600 font-medium">
                    {testimonials[activeSlide].role}
                  </p>
                  <p className="text-sm text-gray-500">{testimonials[activeSlide].location}</p>
                </div>

                {/* Rating */}
                <StarRating rating={testimonials[activeSlide].rating} />

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 text-center leading-relaxed mb-4">
                  "{testimonials[activeSlide].text}"
                </blockquote>

                {/* Highlight */}
                <div className="text-center">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium rounded-full">
                    {testimonials[activeSlide].highlight}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveSlide(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeSlide === index
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setActiveSlide(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => setActiveSlide(prev => (prev + 1) % testimonials.length)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        
      </div>
    </section>
  );
}

export default Testimonial;
