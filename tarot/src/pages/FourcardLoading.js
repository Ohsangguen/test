import React from 'react';
import './FourcardLoading.css';
import image1 from '../components/캐릭터 포즈 모음/타로넙죽-5.png';


const FourcardLoading = () => {
  return (
    <div className="tarot-purple-loading">
      <div className="black-overlay-loading">
        <div className="loading-container">
          <div className="loading-animation">
            <img src={image1} alt="Loading 1" className="loading-image-fourcard" />
            <img src={image1} alt="Loading 2" className="loading-image-fourcard" />
            <img src={image1} alt="Loading 3" className="loading-image-fourcard" />
          </div>
          <div className="loading-text">포카드 해석 중 ...</div>
        </div>
      </div>
    </div>
  );
};

export default FourcardLoading;