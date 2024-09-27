import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCartFun } from '../cartSlice';

const ProductInfo = () => {
    const location = useLocation();
    const { product } = location.state || {};
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [timeLeft, setTimeLeft] = useState(750);

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleQuantityChange = (type) => {
        if (type === 'increment') {
            setQuantity(quantity + 1);
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const addToCartHandler = () => {
        dispatch(addCartFun({ ...product, quantity }));
    };

    if (!product) {
        return <div>No product information available.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                {product.images && product.images.length > 0 && (
                    <div>
                        <img
                            className="w-full h-64 object-cover"
                            src={product.images[selectedImage]}
                            alt={product.title}
                        />
                        <div className="flex justify-center mt-4">
                            {product.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    className={`cursor-pointer w-16 h-16 object-cover ${selectedImage === idx ? 'ring-2 ring-yellow-400' : 'ring-1 ring-gray-300'}`}
                                    src={img}
                                    alt={`Thumbnail ${idx}`}
                                    onClick={() => setSelectedImage(idx)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div>
                <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                <p className="text-xl text-red-600 mb-2">₹{product.price} <span className="line-through text-gray-500">₹{(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</span></p>
                <p className="text-gray-700 mt-4">{product.description}</p>
                <div className="flex items-center mb-4">
                    <p className="mr-4">Quantity:</p>
                    <button onClick={() => handleQuantityChange('decrement')} className="px-3 py-1 bg-gray-200 text-lg font-bold">-</button>
                    <span className="px-4 text-lg">{quantity}</span>
                    <button onClick={() => handleQuantityChange('increment')} className="px-3 py-1 bg-gray-200 text-lg font-bold">+</button>
                </div>
                <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-4"
                    onClick={addToCartHandler}
                >
                    Add to Cart
                </button>
                <button
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                    onClick={addToCartHandler}
                >
                    Buy Now
                </button>
                <div className="mt-6 bg-gray-200 p-4 rounded flex items-center justify-between">
                    <p>Sale ends in: {formatTime(timeLeft)}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
