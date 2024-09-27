import React from 'react';
import { useNavigate } from 'react-router-dom';
import img from './casio.jpg';

function Header_body_main() {
  let navigate = useNavigate();

  let pickUpItems = [
    {
      name: 'OLEVS Watches for Men',
      image: img,
      route: '/Addtocart',
    },
    {
      name: 'Tovimall Bands for Watches',
      image: 'https://via.placeholder.com/100x100',
    },
    {
      name: 'Casio Vintage B640WD',
      image: 'https://via.placeholder.com/100x100',
    },
    {
      name: 'Watch Band for Omega',
      image: 'https://via.placeholder.com/100x100',
    },
  ];

  let keepShoppingItems = [
    {
      name: 'Headphone cases',
      image: 'https://via.placeholder.com/100x100',
      viewed: '9 viewed',
    },
    {
      name: 'Sports duffles',
      image: 'https://via.placeholder.com/100x100',
      viewed: '7 viewed',
    },
    {
      name: 'Books',
      image: 'https://via.placeholder.com/100x100',
      viewed: '6 viewed',
    },
    {
      name: 'Mice',
      image: 'https://via.placeholder.com/100x100',
      viewed: '1 viewed',
    },
  ];

  let keepShoppingItems_fashion = [
    {
      name: 'Books',
      image: 'https://via.placeholder.com/100x100',
      viewed: '6 viewed',
    },
    {
      name: 'Mice',
      image: 'https://via.placeholder.com/100x100',
      viewed: '1 viewed',
    },
    {
      name: 'Books',
      image: 'https://via.placeholder.com/100x100',
      viewed: '6 viewed',
    },
    {
      name: 'Mice',
      image: 'https://via.placeholder.com/100x100',
      viewed: '1 viewed',
    },
  ];

  function onClickHandler(route) {
    if (route) {
      navigate(route);
    }
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full mt-[-22rem] absolute sm:mt-[-24rem] sm:">
      {/* Pick up where you left off */}
      <div className="bg-white p-4 shadow-md rounded-md">
        <h3 className="font-bold mb-4">Pick up where you left off</h3>
        <div className="grid grid-cols-2 gap-2">
          {pickUpItems.map((item, index) => (
            <div
              key={index} 
              className="flex flex-col items-start cursor-pointer"
              onClick={() => onClickHandler(item.route)}
            >
              <img src={item.image} alt={item.name} className="w-full" />
              <p className="text-sm mt-2">{item.name}</p>
            </div>
          ))}
        </div>
        <a href="#" className="text-blue-500 text-sm mt-4 block">
          See more
        </a>
      </div>

      {/* Keep shopping for */}
      <div className="bg-white p-4 shadow-md rounded-md">
        <h3 className="font-bold mb-4">Keep shopping for</h3>
        <div className="grid grid-cols-2 gap-2">
          {keepShoppingItems.map((item, index) => (
            <div key={index} className="flex flex-col items-start">
              <img src={item.image} alt={item.name} className="w-full" />
              <p className="text-sm mt-2">{item.name}</p>
              <p className="text-xs text-gray-500">{item.viewed}</p>
            </div>
          ))}
        </div>
        <a href="#" className="text-blue-500 text-sm mt-4 block">
          View your browsing history
        </a>
      </div>

      {/* Keep shopping for fashion */}
      <div className="bg-white p-4 shadow-md rounded-md">
        <h3 className="font-bold mb-4">Keep shopping for fashion</h3>
        <div className="grid grid-cols-2 gap-2">
          {keepShoppingItems_fashion.map((item, index) => (
            <div key={index} className="flex flex-col items-start">
              <img src={item.image} alt={item.name} className="w-full" />
              <p className="text-sm mt-2">{item.name}</p>
              <p className="text-xs text-gray-500">{item.viewed}</p>
            </div>
          ))}
        </div>
        <a href="#" className="text-blue-500 text-sm mt-4 block">
          View your browsing history
        </a>
      </div>
    </div>
  );
}

export default Header_body_main;
