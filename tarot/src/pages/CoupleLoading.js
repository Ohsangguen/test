import React from 'react';
import './CoupleLoading.css';
import image1 from '../components/커플 타로 넙죽이/커플넙죽이빛.png';
import image2 from '../components/커플 타로 넙죽이/여친 넙죽이.png';
import image3 from '../components/커플 타로 넙죽이/남친 넙죽이.png';

const CoupleLoading = () => {
  return (
    <div className="tarot-purple-loading">
      <div className="black-overlay-loading">
        <div className="loading-container">
          <div className="loading-animation">
            <img src={image2} alt="Loading 1" className="loading-image2" />
            {/* <img src={image1} alt="Loading 1" className="loading-image" /> */}
            <img src={image3} alt="Loading 1" className="loading-image2" />
          </div>
          <div className="loading-text">커플 궁합 확인 중 ...</div>
        </div>
      </div>
    </div>
  );
};

export default CoupleLoading;