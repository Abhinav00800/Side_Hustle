import React, { useEffect, useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

export default function Categories() {
  const [foodCat, setFoodCat] = useState([]);
  const [search, setSearch] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/DisplayData`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      setFoodItems(data[0] || []);
      setFoodCat(data[1] || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load menu items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Memoized filtered items for better performance
  const filteredCategories = useMemo(() => {
    return foodCat.map(category => ({
      ...category,
      items: foodItems.filter(item => 
        item.CategoryName === category.CategoryName && 
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    })).filter(category => category.items.length > 0);
  }, [foodCat, foodItems, search]);

  const clearSearch = () => {
    setSearch("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-200 border-t-amber-600 mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading delicious items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-red-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 transform hover:scale-105"
              onClick={loadData}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative mt-5 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="relative container mx-auto px-4 py-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-2 tracking-tight" style={{fontFamily: 'serif'}}>
            Discover Our Products
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Explore our required categories and products
          </p>
          <div className="mt-8 w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-full focus:ring-4 focus:ring-amber-100 focus:border-amber-500 transition-all duration-200 bg-gray-50 focus:bg-white" 
                type="search" 
                placeholder="Search for delicious items..." 
                aria-label="Search" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {search && (
              <div className="text-center mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                  {filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0)} items found
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-16">
        {filteredCategories.length > 0 ? (
          <div className="space-y-16">
            {filteredCategories.map((category, categoryIndex) => (
              <div 
                key={category._id} 
                className="animate-fade-in"
                style={{animationDelay: `${categoryIndex * 0.1}s`}}
              >
                {/* Category Header */}
                <div className="text-center mb-12">
                  <h2 
                    className="text-4xl md:text-5xl font-bold text-amber-700 mb-4"
                    style={{fontFamily: 'serif'}}
                  >
                    {category.CategoryName}
                  </h2>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="h-1 w-16 bg-gradient-to-r from-transparent to-amber-600 rounded-full"></div>
                    <div className="h-2 w-2 bg-amber-600 rounded-full"></div>
                    <div className="h-1 w-16 bg-gradient-to-l from-transparent to-amber-600 rounded-full"></div>
                  </div>
                  <p className="text-gray-600 mt-3 font-medium">
                    {category.items.length} {category.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
                
                {/* Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {category.items.map((item, itemIndex) => (
                    <div 
                      key={item._id} 
                      className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in"
                      style={{animationDelay: `${(categoryIndex * 0.1) + (itemIndex * 0.05)}s`}}
                    >
                      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                        <Card 
                          item={item}
                          foodname={item.name}
                          foodimg={item.img}
                          desc={item.description}
                          options={item.options}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* No Results */
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No items found</h3>
              <p className="text-gray-600 mb-8 text-lg">
                {search ? 
                  `No items match "${search}". Try adjusting your search or browse our categories.` :
                  "It looks like there are no items available at the moment."
                }
              </p>
              {search && (
                <button 
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-full transition duration-200 transform hover:scale-105 shadow-lg"
                  onClick={clearSearch}
                >
                  View All Items
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
