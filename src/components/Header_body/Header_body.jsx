import React, { useState, useEffect } from 'react';

const Header_body = () => {
  let images = [
    "https://images-eu.ssl-images-amazon.com/images/G/31/12407722031/NSSSupersaleAugust/NSS_Hero_PC_V1_1500x600._CB565842397_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/prime/ACQ/BAU/PC/Hero/HO/PSE/PSE_PC_3000X1200_T3._CB567196011_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/AmazonBusiness/img24/GW/Aug/GW-Hero/ExclusiveBusinessDeals_3000_1200_2208._CB565876933_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/IMG24/Smart_Watches/GW-Hero_PC_3000X1200_Snapp_New_PL._CB566101748_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img21/CEPC/Clearance/Jun21/D23947948_IN_CEPC_Clearance_store_May21_rush_3000x12000.5x._CB665291878_.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to move to the next slide
  function nextSlide() {
    let index = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  // Automatic slideshow effect
  useEffect(() => { 
    let interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative">
      <div className="w-full">
        <div className="flex items-center justify-center w-full relative">
          <div className='w-full'>
            <img
              src={images[currentIndex]}
              alt="Slideshow"
              className='w-full'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header_body;
