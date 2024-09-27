import React, { useState } from "react";
import Productdelivery from "./Productdelivery";

function PaymentMethod(props) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");
  const [netBankingOption, setNetBankingOption] = useState("");
  const [giftCardCode, setGiftCardCode] = useState("");
  const [details, setDetails] = useState(false);
  const [totalPayment, setTotalPayment] = useState(1000); // Example total payment
  const [deliveryCost, setDeliveryCost] = useState(50); // Example delivery cost
  const [discountApplied, setDiscountApplied] = useState(false);

  const UNIQUE_COUPON_CODE = "Gore@1100"; // Unique coupon code

  const handlePaymentChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleNetBankingChange = (e) => {
    setNetBankingOption(e.target.value);
  };

  const handleGiftCardChange = (e) => {
    setGiftCardCode(e.target.value);
  };

  const handleApplyCode = () => {
    if (giftCardCode === UNIQUE_COUPON_CODE) {
      setDeliveryCost(0); // Free delivery
      const discountAmount = props.totalpayment * 0.25; // 25% off
      setTotalPayment(props.totalpayment - discountAmount);
      setDiscountApplied(true);
      console.log("Coupon applied: Free delivery and 25% off");
    } else {
      console.log("Invalid coupon code.");
      alert("Invalid coupon code.");
    }
  };

  const handlePaymentSubmit = () => {
    console.log("Selected payment method:", selectedPaymentMethod);
    console.log("Selected net banking option:", netBankingOption);
    setDetails(true); // Show Productdelivery after payment is submitted
  };

  return (
    <div className="p-6 w-[41.5%] bg-white  absolute mt-[25px]">
      <h2 className="text-lg font-bold mb-4">Payment Method</h2>
      <hr className="w-full"/>
      {!details ? (
        <div className="w-full border border-gray-200 rounded-md shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Your available balance</h2>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={giftCardCode}
                onChange={handleGiftCardChange}
                className="p-2 border border-gray-300 rounded-md flex-grow"
              />
              <button
                onClick={handleApplyCode}
                className="px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md"
              >
                Apply
              </button>
            </div>
            {discountApplied && (
              <p className="text-green-600 mt-2">Coupon applied: Free delivery and 25% off!</p>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Another payment method</h2>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={selectedPaymentMethod === "card"}
                  onChange={handlePaymentChange}
                  className="mr-2 mb-[38px]"
                />
                <label className="items-center">
                  Credit or debit card
                  <div className="flex space-x-2 mt-4">
                    <img
                      src="https://m.media-amazon.com/images/G/31/payments-portal/r1/issuer-images/sprite-map._CB443317321_.png"
                      alt="Visa"
                      className="h-6"
                    />
                  </div>
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netBanking"
                  checked={selectedPaymentMethod === "netBanking"}
                  onChange={handlePaymentChange}
                  className="mr-2"
                />
                <label className="flex-grow">
                  Net Banking
                  {selectedPaymentMethod === "netBanking" && (
                    <select
                      value={netBankingOption}
                      onChange={handleNetBankingChange}
                      className="block mt-2 p-2 border border-gray-300 rounded-md w-full"
                    >
                      <option value="">Choose an Option</option>
                      <option value="bank1">Bank 1</option>
                      <option value="bank2">Bank 2</option>
                      <option value="bank3">Bank 3</option>
                    </select>
                  )}
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={selectedPaymentMethod === "upi"}
                  onChange={handlePaymentChange}
                  className="mr-2"
                />
                <label>Other UPI Apps</label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="emi"
                  checked={selectedPaymentMethod === "emi"}
                  onChange={handlePaymentChange}
                  className="mr-2"
                />
                <label>EMI</label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={selectedPaymentMethod === "cod"}
                  onChange={handlePaymentChange}
                  className="mr-2"
                />
                <label className="flex-grow">
                  Cash on Delivery/Pay on Delivery
                  <p className="text-sm text-gray-600">
                    Cash, UPI, and Cards accepted.{" "}
                    <a href="#" className="text-blue-600">Know more.</a>
                  </p>
                </label>
              </div>
            </div>
          </div>

          <div className="text-lg font-semibold mb-4">
            Total Payment: ₹{totalPayment} (Delivery: ₹{deliveryCost})
          </div>

          <button
            onClick={handlePaymentSubmit}
            className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Use this payment method
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <Productdelivery finalvalue={totalPayment}/>
        </div>
      )}
    </div>
  );
}

export default PaymentMethod;
