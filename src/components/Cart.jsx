import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeCartFun, incrementQuantity, decrementQuantity, checkitemfun } from '../cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart?.addCart || []);
  const [selectedItems, setSelectedItems] = useState([]);
  const totalItems = selectedItems.length;
  const totalPrice = selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  console.log(cartItems,"#######");
  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickCartHandler = () => {
    navigate('/');
  };

  const onDeleteHandler = (id) => {
    dispatch(removeCartFun(id));
  };

  const onIncrementHandler = (id) => {
    dispatch(incrementQuantity(id));
  };

  const onDecrementHandler = (id) => {
    dispatch(decrementQuantity(id));
  };

  const onSelectItemHandler = (item) => {
    const itemFound = selectedItems.find((i) => i.id === item.id);

    if (itemFound) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const onProceedToPayHandler = () => {
    if (selectedItems.length > 0) {
      const calculatedOrderSummary = {
        items: totalPrice,
        delivery: 80.00,
        total: totalPrice + 80.00,
        promotionApplied: 0.00,
        orderTotal: totalPrice + 80.00,
      };

      dispatch(checkitemfun(selectedItems));
      navigate('/payment', { state: { selectedItems, calculatedOrderSummary, totalPrice } });
    } else {
      alert("Please select at least one product to proceed to payment.");
    }
  };

  return (
    <div className="p-6 w-full">
      {cartItems.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold">Your Cart is empty.</h2>
          <p className="text-sm mt-2">
            Check your Saved for later items below or{' '}
            <button className="text-blue-600" onClick={onClickCartHandler}>
              continue shopping.
            </button>
          </p>
        </div>
      ) : (
        <div className="flex w-full">
          {/* Cart Items List */}
          <div className="gap-4 w-[50%] text-center">
            <p className="text-[25px] font-medium mb-4">Shopping Cart</p>
            {cartItems.map((item) => (
              <div key={item.id} className="border p-4 rounded flex items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-4"
                  checked={!!selectedItems.find((i) => i.id === item.id)}
                  onChange={() => onSelectItemHandler(item)}
                />
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-32 h-32 object-cover"
                />

                <div className="ml-4 flex-grow">
                  <h3 className="text-xl font-bold mt-2">{item.title}</h3>
                  <p className="text-gray-700">₹{item.price}</p>
                  <p className="text-red-600">-{item.discountPercentage}%</p>
                  <div className="flex items-center mt-2">
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                      onClick={() => onDecrementHandler(item.id)}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                      onClick={() => onIncrementHandler(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="ml-4 bg-red-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => onDeleteHandler(item.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="ml-8 w-[40%]">
            <div className="border-t border-gray-300 pt-4">
              <h3 className="text-lg font-semibold">Total Selected Items: {totalItems}</h3>
              <h3 className="text-lg font-semibold">Order Total: ₹{totalPrice.toFixed(2)}</h3>
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={onProceedToPayHandler}
              >
                Place your order
              </button>
              <p className="text-xs text-gray-600 mt-2">
                By placing your order, you agree to Amazon's{' '}
                <a href="#" className="text-blue-600">privacy notice</a> and{' '}
                <a href="#" className="text-blue-600">conditions of use</a>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
