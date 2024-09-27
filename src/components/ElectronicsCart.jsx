import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCartFun, toggleFavorite } from '../cartSlice';
import { product } from './Producr';  // Assuming this is your products data

const Addtocart = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const productsPerPage = 25; // Number of products per page

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.cart.favorites);

  useEffect(() => {
    // Simulate product fetch
    setProducts(product);
    setFilteredProducts(product); // Set filtered products initially to all products

    // Extract unique categories from products
    const uniqueCategories = [...new Set(product.map(product => product.category.name))];
    setCategories(uniqueCategories);
  }, []);

  // Add product to cart
  const addToCartHandler = (product) => {
    dispatch(addCartFun(product));
  };

  // Navigate to product description
  const onClickDescriptionHandler = (product) => {
    navigate('/productinfo', { state: { product } });
  };

  // Toggle favorite status
  const toggleFavoriteHandler = (product) => {
    dispatch(toggleFavorite(product));
    navigate('/favoriteinfo', { state: { product } });
  };

  // Filter products by category
  const filterByCategory = (category) => {
    setCurrentPage(1); // Reset to the first page when category changes
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category.name === category));
    }
  };

  // Check if a product is in the favorites list
  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className='p-4'>
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => filterByCategory('All')}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            onClick={() => filterByCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="w-full grid grid-cols-5 gap-4">
        {currentProducts.map((product) => (
          <div key={product.id} className="w-full rounded overflow-hidden shadow-lg mb-6 gap-1">
            <img
              className="w-full"
              src={product.images}
              alt="Product"
              onClick={() => onClickDescriptionHandler(product)}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{product.title}</div>
              <p className="text-gray-700 text-base">
                ₹{product.price}
              </p>
              <p className="text-gray-500 text-sm">Inclusive of all taxes</p>
            </div>
            <div className="px-6 pt-4 pb-2 flex text-center gap-8">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCartHandler(product);
                }}
              >
                Add to Cart
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavoriteHandler(product);
                }}
                className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
              >
                {isFavorite(product.id) ? 'Remove from Favorite' : 'Add to Favorite'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={`mx-2 px-4 py-2 rounded-lg ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Addtocart;
