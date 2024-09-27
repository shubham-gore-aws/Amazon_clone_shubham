import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../cartSlice';

const FavoriteList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.cart.favorites);

  const handleRemoveFavorite = (productId) => {
    dispatch(toggleFavorite({ id: productId }));
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Favorite Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              {/* Loop through product images */}
              <div className="w-full h-64 overflow-hidden">
                {product.images.length > 0 && (
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    src={product.images[0]}
                    alt={product.description}
                  />
                )}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg truncate">{product.description}</h3>
              <p className="text-gray-600 mt-2">₹{product.price}</p>
            </div>
            <div className="p-4">
              <button
                onClick={() => handleRemoveFavorite(product.id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition duration-300"
              >
                Remove from Favorite
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteList;
