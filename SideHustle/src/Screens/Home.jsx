import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Fotter from '../components/Fotter';
import Carousal from '../components/Carousal';
import Testimonial from '../components/Testimonial.jsx';
import Card from '../components/Card.jsx';

// Icons
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ClearIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const GridIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ListIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
  </svg>
);

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [search, setSearch] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const loadData = useCallback(async () => {
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
        throw new Error(`Failed to load data. Please try again.`);
      }
      
      const data = await response.json();
      setFoodItems(data[0] || []);
      setFoodCat(data[1] || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Unable to load products. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Memoized filtered and sorted items
  const filteredAndSortedItems = useMemo(() => {
    let filtered = foodItems.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase()) ||
      item.CategoryName.toLowerCase().includes(search.toLowerCase())
    );

    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.CategoryName === activeCategory);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return (a.options[0]?.price || 0) - (b.options[0]?.price || 0);
        case 'price-high':
          return (b.options[0]?.price || 0) - (a.options[0]?.price || 0);
        case 'category':
          return a.CategoryName.localeCompare(b.CategoryName);
        default:
          return 0;
      }
    });

    return filtered;
  }, [foodItems, search, sortBy, activeCategory]);

  // Get categories with counts
  const categoriesWithCount = useMemo(() => {
    const counts = foodItems.reduce((acc, item) => {
      acc[item.CategoryName] = (acc[item.CategoryName] || 0) + 1;
      return acc;
    }, {});
    
    return foodCat.map(cat => ({
      ...cat,
      count: counts[cat.CategoryName] || 0
    }));
  }, [foodCat, foodItems]);

  // Search suggestions
  const searchSuggestions = useMemo(() => {
    if (!search || search.length < 2) return [];
    return filteredAndSortedItems.slice(0, 5);
  }, [search, filteredAndSortedItems]);

  const handleCategoryFilter = (categoryName) => {
    setActiveCategory(categoryName);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setShowSearchSuggestions(true);
  };

  const clearSearch = () => {
    setSearch("");
    setShowSearchSuggestions(false);
  };

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      title: "Discover Amazing Products",
      subtitle: "Support local businesses and find unique items that tell a story",
      cta: "Start Shopping"
    },
    {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      title: "Quality You Can Trust",
      subtitle: "Handpicked products from verified sellers with guaranteed satisfaction",
      cta: "Browse Categories"
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      title: "Behind Every Product",
      subtitle: "There's a passionate entrepreneur with a dream to serve you better",
      cta: "Meet Our Sellers"
    }
  ];

  // Loading Component
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-400 rounded-full animate-pulse mx-auto"></div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">Loading Amazing Products</h3>
              <p className="text-gray-600">Discovering the best deals for you...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error Component
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="text-center space-y-6 max-w-md px-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">Oops! Something went wrong</h3>
              <p className="text-gray-600">{error}</p>
            </div>
            <button 
              onClick={loadData}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-white max-w-4xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                  {slide.subtitle}
                </p>
                <button className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                currentSlide === index ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Enhanced Search Bar */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-30">
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex items-center px-6 py-4">
                  {/* <SearchIcon className="text-gray-400 mr-4" />
                  <input
                    type="text"
                    placeholder="Search for products, categories, or descriptions..."
                    value={search}
                    onChange={handleSearchChange}
                    onFocus={() => setShowSearchSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                    className="flex-1 text-lg placeholder-gray-400 outline-none"
                  /> */}
                  {search && (
                    <button
                      onClick={clearSearch}
                      className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ClearIcon />
                    </button>
                  )}
                </div>

                {/* Search Suggestions */}
                {showSearchSuggestions && searchSuggestions.length > 0 && (
                  <div className="border-t border-gray-100 bg-gray-50">
                    <div className="p-4">
                      <p className="text-sm font-medium text-gray-700 mb-3">Quick Results</p>
                      <div className="space-y-2">
                        {searchSuggestions.map(item => (
                          <div key={item._id} className="flex items-center space-x-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-colors">
                            <img src={item.img} alt={item.name} className="w-8 h-8 rounded object-cover" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.CategoryName}</p>
                            </div>
                            <span className="text-sm font-semibold text-blue-600">₹{item.options[0]?.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls Section */}
      <div className="mt-16 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            
            {/* Category Filters */}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-4">
                <FilterIcon />
                <h3 className="text-lg font-semibold text-gray-800">Filter by Category</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryFilter('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === 'all'
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  All Products ({foodItems.length})
                </button>
                {categoriesWithCount.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => handleCategoryFilter(category.CategoryName)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeCategory === category.CategoryName
                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {category.CategoryName} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="category">Sort by Category</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  title="Grid View"
                >
                  <GridIcon />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  title="List View"
                >
                  <ListIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results Header */}
      {search && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800">
              {filteredAndSortedItems.length} results found for "{search}"
              {filteredAndSortedItems.length === 0 && (
                <span className="text-blue-600 font-normal ml-2">- Try adjusting your search terms</span>
              )}
            </h3>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {foodCat.length > 0 ? (
          <div className="space-y-12">
            {foodCat.map((category) => {
              const categoryItems = filteredAndSortedItems.filter(item => 
                item.CategoryName === category.CategoryName
              );

              if (categoryItems.length === 0) return null;

              return (
                <div key={category._id} className="category-section">
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{category.CategoryName}</h2>
                        <p className="text-gray-600">{categoryItems.length} products available</p>
                      </div>
                    </div>
                    
                    {categoryItems.length > 6 && (
                      <button className="px-6 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                        View All
                      </button>
                    )}
                  </div>

                  {/* Products Grid */}
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                      : 'grid-cols-1'
                  }`}>
                    {categoryItems.map(item => (
                      <div key={item._id} className="transform transition-transform duration-200 hover:-translate-y-1">
                        <Card
                          email={item.email}
                          item={item}
                          foodname={item.name}
                          foodimg={item.img}
                          desc={item.description}
                          options={item.options}
                          viewMode={viewMode}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Categories Available</h3>
            <p className="text-gray-600 mb-6">Our sellers are working hard to bring you amazing products!</p>
            <button 
              onClick={loadData}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Refresh Page
            </button>
          </div>
        )}

        {/* No Results State */}
        {filteredAndSortedItems.length === 0 && search && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any products matching "{search}". Try adjusting your search terms or browse our categories.
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={clearSearch}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Clear Search
              </button>
              <button 
                onClick={() => setActiveCategory('all')}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Browse All
              </button>
            </div>
          </div>
        )}
      </div>

   

      <Testimonial />
      <Fotter />
    </div>
  );
}
