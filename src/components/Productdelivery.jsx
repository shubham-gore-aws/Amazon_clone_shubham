import React from 'react';

const getRandomArrivalDate = (minDays = 7, maxDays = 14) => {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
  const arrivalDate = new Date(today.setDate(today.getDate() + randomDays));
  
  return arrivalDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const CheckoutSummary = ({ cartItems = [], totalAmount },props) => {
  const randomArrivalDate = getRandomArrivalDate();
  return (
    <div className="p-4">
      <div className="mb-4 border border-yellow-400 bg-yellow-50 p-4">
        <span className="font-semibold">⚠️ One-time password required at time of delivery</span>
        <p className="text-sm">Please ensure someone will be available to receive this delivery.</p>
      </div>

      <div className="border border-gray-300 p-4">
        <h2 className="text-green-600 font-semibold text-lg">Arriving {randomArrivalDate}</h2>
        <p className="text-sm text-gray-600">Items dispatched by Amazon</p>

        <div className="flex mt-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mb-2" />
              <p className="text-sm">{item.name}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              <p className="text-sm text-red-500">₹{item.price}</p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <p className="text-sm">Choose a delivery option:</p>
          <div>
            <input type="radio" name="delivery-option" value="free" defaultChecked /> {randomArrivalDate} - FREE Delivery
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-4 pt-4">
        <p className="font-semibold text-lg">Order Total: ₹{props.finalvalue}</p>
        
        <button className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 mt-2">Place your order</button>
        <p className="text-xs text-gray-600 mt-2">
          By placing your order, you agree to Amazon's{' '}
          <a href="#" className="text-blue-600">privacy notice</a> and{' '}
          <a href="#" className="text-blue-600">conditions of use</a>.

        </p>  
      </div>
      
    </div>
  );
};

export default CheckoutSummary;
