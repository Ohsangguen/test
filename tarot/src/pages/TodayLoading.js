import React from 'react';
import './TodayLoading.css';
import image1 from '../components/캐릭터 포즈 모음/타로넙죽-3.png';


const TodayLoading = () => {
  return (
    <div className="tarot-purple-loading">
      <div className="black-overlay-loading">
        <div className="loading-container">
          <div className="loading-animation">
            <img src={image1} alt="Loading 1" className="loading-image-today" />
            <img src={image1} alt="Loading 2" className="loading-image-today" />
            <img src={image1} alt="Loading 3" className="loading-image-today" />
          </div>
          <div className="loading-text">오늘의 운세 확인 중 ...</div>
        </div>
      </div>
    </div>
  );
};

export default TodayLoading;