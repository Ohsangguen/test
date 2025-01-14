import React from 'react';
import './Loding.css';
import image1 from '../components/캐릭터 포즈 모음/타로넙죽-3.png';
import image2 from '../components/캐릭터 포즈 모음/타로넙죽-3.png';
import image3 from '../components/캐릭터 포즈 모음/타로넙죽-3.png';


const Loding = () => {
  return (
    <div className="tarot-purple-loding">
      <div className="black-overlay-loding">
        <div className="loading-container">
          <div className="loading-animation">
            <img src={image1} alt="Loading 1" className="loading-image" />
            <img src={image2} alt="Loading 2" className="loading-image" />
            <img src={image3} alt="Loading 3" className="loading-image" />
          </div>
          <div className="loading-text">로딩 중...</div>
        </div>
      </div>
    </div>
  );
};

export default Loding;