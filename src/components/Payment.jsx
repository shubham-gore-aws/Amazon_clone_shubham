import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import AddressForm from "./Adressfrom";
import Paymentdetails from "./Paymentdetail";
import OrderSummaryReplica from "./OrderSummaryReplica"; // Import the OrderSummaryReplica component
import "./Checkout.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Payment() {
  let location = useLocation();

  const initialAddresses = [];
  const cartItems = useSelector((state) => state.cart?.addCart || []);
  const checkboxchecked = useSelector((state) => state.cart.checkitem1);
  console.log(checkboxchecked);

  const [addresses, setAddresses] = useState(initialAddresses);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showGiftCardInput, setShowGiftCardInput] = useState(false);
  let [paymentmethod, setpaymentmethod] = useState(false);

  const handleAddressChange = (id) => {
    setSelectedAddress(id);
  };

  const handleAddNewAddress = (newAddress) => {
    const newId = addresses.length + 1;
    const newAddressEntry = {
      id: newId,
      ...newAddress,
    };
    setAddresses((prev) => [...prev, newAddressEntry]);
  };

  const handleUseAddress = () => {
    if (selectedAddress !== null) {
      console.log("Selected address:", selectedAddress);
      setpaymentmethod(true);
    } else {
      alert("Please select an address first.");
    }
  };

  const handleGiftCardClick = () => {
    setShowGiftCardInput(!showGiftCardInput);
  };

  const handleApplyCode = () => {
    // Implement your logic to handle applying the gift card or promotion code
    console.log("Gift card or promotion code applied");
  };

  return (
    <div className="w-full p-4">
      <div className="header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon"
          className="amazon-logo"
        />
        <span className="checkout-title">Checkout</span>
        <div className="lock-icon">&#x1F512;</div>
      </div>

      <div className="flex w-full">
        {/* Left Section (Address and Payment Method) */}
        <div className="flex w-[80%] items-center justify-center mr-[200px]">
          <div className="h-auto w-full">
            <div className="w-[45%] mx-auto p-[25px] h-auto">
              <h2 className="text-lg font-bold mb-4">1. Select a delivery address</h2>

              <div className="mt-[20px] p-4 border border-gray-300 rounded-lg">
                <h3 className="text-md font-bold mb-2">Your addresses</h3>
                <div className="space-y-2">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex items-center space-x-2 border border-gray-300 rounded-lg bg-white"
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddress === address.id}
                        onChange={() => handleAddressChange(address.id)}
                      />
                      <div>
                        <h2>{address.fullName}</h2>
                        <p>{address.area}</p>
                        <p>
                          {address.city}, {address.state}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div>
                    <Popup
                      trigger={
                        <button className="text-yellow-600">
                          + Add a new address
                        </button>
                      }
                      position="center"
                      className="mr-7"
                    >
                      {(close) => (
                        <AddressForm
                          onSubmit={(newAddress) => {
                            handleAddNewAddress(newAddress);
                            close();
                          }}
                        />
                      )}
                    </Popup>
                  </div>
                </div>
                <hr className="w-full bg-white mt-[30px]" />

                <div className="mb-4">
                  <h3 className="text-md font-bold mb-2">Your pickup locations</h3>
                  <a href="#pickup" className="text-blue-500">
                    Find a pickup location near you
                  </a>
                  <hr className="w-full bg-white mt-[30px]" />
                </div>
                <div className="w-full bg-gray-400 mt-4">
                  <button
                    onClick={handleUseAddress}
                    className="bg-yellow-500 text-white pb-2 px-4 rounded mt-4"
                  >
                    Use this address
                  </button>
                </div>
              </div>
              <hr className="w-full bg-white mt-[30px]" />
              <div>
                {paymentmethod ? (
                  <div className="border border-gray-300 rounded-lg">
                    <Paymentdetails totalpayment={location.state.totalPrice}/>
                  </div>
                ) : (
                  <div className="flex gap-10">
                    <h2 className="text-lg font-bold mb-4">2. Payment method</h2>
                    <p>Pay on delivery (Cash/Card)</p>

                    <div className="gift-card-section">
                      <button
                        onClick={handleGiftCardClick}
                        className="text-blue-500 underline"
                      >
                        {showGiftCardInput
                          ? "Hide"
                          : "Add a gift card or promotion code"}
                      </button>
                      {showGiftCardInput && (
                        <div className="mt-2 flex items-center">
                          <input
                            type="text"
                            placeholder="Enter Code"
                            className="border border-gray-300 rounded-lg p-2 flex-grow mr-2"
                          />
                          <button
                            onClick={handleApplyCode}
                            className="bg-gray-300 rounded-lg p-2"
                          >
                            Apply
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section (Order Summary) */}
        <div className="w-[20%] ml-[-30%] ">
        <div className="grid grid-cols-2 border-rose-100  border border-gray-300 rounded-lg mb-[20px] mt-[20px] ">
          {checkboxchecked.map((item) => (
            <div key={item.id} className="flex mt-4 items-center">
              <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover mr-4" />
              <div>
                <p className="text-sm">{item.title}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                <p className="text-sm text-red-500">₹{location.state.totalPrice}</p>
              </div>
            </div>
          ))}
           
          {/* Add the Order Summary replica here */}
          
        </div>
        <div><OrderSummaryReplica total={location.state.totalPrice} /></div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
