import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartFun, toggleFavorite } from "../cartSlice";

const Addtocart = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.cart.searchTerm);
  const favorites = useSelector((state) => state.cart.favorites);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
      setFilteredProducts(data.products);
      const uniqueCategories = [
        ...new Set(data.products.map((product) => product.category)),
      ];
      setCategories(["All", ...uniqueCategories]); // Add "All" as the first category
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const addToCartHandler = (product) => {
    dispatch(addCartFun(product));
  };

  const onClickDescriptionHandler = (product) => {
    navigate("/productinfo", { state: { product } });
  };

  const toggleFavoriteHandler = (product) => {
    dispatch(toggleFavorite(product));
  };

  const filterByCategory = (category) => {
    if (category === "All") {
      setFilteredProducts(products); // Show all products if "All" is selected
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <select
          className="w-[10%] px-4 py-2 border border-gray-300 rounded-md text-gray-700"
          onChange={(e) => filterByCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category} className=" border border-gray-300 rounded-md">
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="w-full grid grid-cols-5 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="w-full rounded overflow-hidden shadow-lg mb-6 gap-1"
          >
            <img
              className="w-full"
              src={product.thumbnail}
              alt="Product"
              onClick={() => onClickDescriptionHandler(product)}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{product.title}</div>
              <p className="text-gray-700 text-base">
                ₹{product.price}{" "}
                <span className="text-red-600">
                  -{product.discountPercentage}%
                </span>
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
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                {favorites.some((item) => item.id === product.id)
                  ? "Remove from Favorite"
                  : "Add to Favorite"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addtocart;
