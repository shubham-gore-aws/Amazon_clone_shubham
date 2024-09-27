import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import './Checkout.css';
import { useNavigate } from 'react-router-dom';

function AddressForm({ onSubmit }) {
  const [address, setAddress] = useState({
    country: "India",
    fullName: "",
    mobileNumber: "",
    pincode: "",
    flat: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    defaultAddress: false,
    deliveryInstructions: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Address Submitted:", address);
    onSubmit(address); // Pass the address data to the onSubmit function
  };

  return (
    <div className="w-[100%] ">
      <div className="w-[500px] bg-white absolute">
        <h2 className="text-lg font-bold mb-4">Add a new address</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <button className="bg-blue-100 text-blue-500 py-2 px-4 rounded">
              Save time. Autofill your current location.
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Country/Region *</label>
            <select
              name="country"
              value={address.country}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="India">India</option>
              {/* Add other countries as options here */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Full name *</label>
            <input
              type="text"
              name="fullName"
              value={address.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mobile number *</label>
            <input
              type="text"
              name="mobileNumber"
              value={address.mobileNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Pincode *</label>
            <input
              type="text"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Flat, House no., Building, Company, Apartment *
            </label>
            <input
              type="text"
              name="flat"
              value={address.flat}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Area, Street, Sector, Village</label>
            <input
              type="text"
              name="area"
              value={address.area}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Landmark</label>
            <input
              type="text"
              name="landmark"
              value={address.landmark}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Town/City *</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="defaultAddress"
                checked={address.defaultAddress}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2">Make this my default address</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Delivery instructions (optional)
            </label>
            <textarea
              name="deliveryInstructions"
              value={address.deliveryInstructions}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-yellow-500 text-white py-2 px-4 rounded"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddressForm;
