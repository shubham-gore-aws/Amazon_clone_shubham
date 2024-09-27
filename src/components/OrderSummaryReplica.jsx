import React from 'react';

function OrderSummaryReplica({ total }) {
  return (
    <div className="w-full p-4 bg-white border border-gray-300 rounded-lg">
      {/* Button Section */}
      <div className="mb-4">
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded w-full">
          Use this address
        </button>
        <p className="text-sm text-gray-600 mt-2">
          Choose a shipping address and payment method to calculate shipping, handling, and tax.
        </p>
      </div>

      {/* Order Summary */}
      <div className="mt-4 border-t border-gray-300 pt-4">
        <h2 className="text-lg font-bold mb-2">Order Summary</h2>
        <div className="flex justify-between text-sm mb-1">
          <p>Items:</p>
          <p>--</p>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <p>Delivery:</p>
          <p>--</p>
        </div>
        <div className="flex justify-between text-lg font-bold text-red-500 mt-2">
          <p>Order Total:</p>
          <p>₹{total.toFixed(2)}</p>
        </div>
      </div>

      {/* Delivery Costs Info */}
      <div className="mt-4 text-sm text-blue-600 underline">
        <a href="#deliveryCosts">How are delivery costs calculated?</a>
      </div>
    </div>
  );
}

export default OrderSummaryReplica;
