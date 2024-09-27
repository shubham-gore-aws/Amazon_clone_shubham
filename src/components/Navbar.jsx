import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchTerm } from "../cartSlice";

const AmazonHeader = () => {
  let Navigate = useNavigate();
  let dispatch = useDispatch(); 
  let total = useSelector((state) => state.cart.addCart);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retrieve the user's name from localStorage
    const name = localStorage.getItem("YourName");
    if (name) {
      setUserName(name); // Set the name to the state
    }
  }, []); // Empty dependency array ensures this runs once on mount

  function onclickcarthandler() {
    Navigate("/Cart");
  }

  function onclickhomehandler() {
    Navigate("/");
  }

  function onclickelectronicscart() {
    Navigate("/ElectronicsCart");
  }

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value)); // Update the search term in Redux
  };

  return (
    <header className="bg-gray-900 text-white py-2">
      <div className="max-w-full mx-auto flex flex-wrap items-center justify-between px-4">
        {/* Logo and Delivery Information */}
        <div className="flex items-center space-x-4">
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Amazon Logo"
            className="w-24 h-auto"
            onClick={() => onclickhomehandler()}
          />
          <div>
            <p className="text-xs">Deliver to {userName || "Guest"}</p>
            <p className="text-sm font-semibold">Nanded Wa... 431601</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-grow mx-4">
          <input
            type="text"
            placeholder="Search Amazon.in"
            className="w-full py-2 px-4 rounded-l-md text-black"
            onChange={handleSearch}
          />
          <button className="bg-yellow-500 py-2 px-4 rounded-r-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M17 10A7 7 0 1 1 3 10a7 7 0 0 1 14 0z"
              />
            </svg>
          </button>
        </div>

        {/* User Options */}
        <div className="flex items-center space-x-6">
          {/* Language and Flag */}
          <div className="flex items-center space-x-1">
            <img
              src="https://flagcdn.com/w320/in.png"
              alt="India Flag"
              className="w-5 h-5"
            />
            <span>EN</span>
          </div>

          {/* Account & Lists */}
          <div className="flex flex-col items-end">
            <p className="text-xs">Hello, {userName || "Guest"}</p>
            <p className="text-sm font-semibold">Account & Lists</p>
          </div>

          {/* Returns & Orders */}
          <div className="flex flex-col items-end">
            <p className="text-xs">Returns</p>
            <p className="text-sm font-semibold">& Orders</p>
          </div>

          {/* Cart Button */}
          <div className="relative flex items-center space-x-2">
            <button className="flex items-center focus:outline-none" onClick={() => onclickcarthandler()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h18l-1.5 13H4.5L3 3zm3 16a2 2 0 1 0 4 0H6zm7 0a2 2 0 1 0 4 0h-4z"
                />
              </svg>
              <p className="ml-2 font-semibold">Cart</p>
              <span className="ml-1 bg-yellow-500 text-black font-bold py-1 px-2 rounded-full">
                {total.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-800 py-2">
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-center space-x-6 text-sm">
          <a href="#" className="baner_bottom_navigation" onClick={() => onclickhomehandler()}>
            All
          </a>
          <a href="#" className="baner_bottom_navigation">
            Best Sellers
          </a>
          <a href="#" className="baner_bottom_navigation">
            New Releases
          </a>
          <a href="#" className="baner_bottom_navigation">
            Amazon miniTV
          </a>
          <a href="#" className="baner_bottom_navigation">
            Sell
          </a>
          <a href="#" className="baner_bottom_navigation">
            Books
          </a>
          <a href="#" className="baner_bottom_navigation">
            Buy Again
          </a>
          <a href="#" className="baner_bottom_navigation">
            AmazonBasics
          </a>
          <a href="#" className="baner_bottom_navigation">
            Gift Ideas
          </a>
          <a href="#" className="baner_bottom_navigation">
            Health, Household & Personal Care
          </a>
          <a href="#" className="baner_bottom_navigation">
            Home Improvement
          </a>
          <a href="#" className="baner_bottom_navigation">
            Gift Cards
          </a>
          <a href="#" className="baner_bottom_navigation">
            Home & Kitchen
          </a>
          <button href="#" className="baner_bottom_navigation" onClick={() => onclickelectronicscart()}>
            Computers
          </button>
        </div>
      </nav>
    </header>
  );
};

export default AmazonHeader;
