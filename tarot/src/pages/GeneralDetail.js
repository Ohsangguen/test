import React from 'react';
import { useLocation } from 'react-router-dom';
import cardImage from '../components/card_image.png'; // 카드 이미지 import
import './GeneralDetail.css';

const GeneralDetail = () => {
  const location = useLocation();
  const { selectedCards } = location.state;
  console.log(selectedCards);

  return (

    <div id="tarot-screen" className="tarot-purple-today">
      <div className="black-overlay-today"></div>

      <div className="container-today">
        <h1 style={{ textAlign: 'center', color: 'white' }}>카드 해석 결과</h1>

        {/* 카드 4장 포카드 배치 */}
        <div className="cards-spread">
          {selectedCards.map((card, index) => (
            <div 
              key={index} 
              className="selected-card"
              style={{
                position: 'absolute',
                top: '20%',
                left: `${25 + index * 15}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: `${5 + index}`,
              }}
            >
              <img
                src={cardImage}
                alt={`Selected Tarot card ${index + 1}`}
                className="tarot-card"
              />
            </div>
          ))}
        </div>

        {/* 해석 텍스트 박스 */}
        <div 
          className="interpretation-box"
          style={{
            marginTop: '10vh',
            backgroundColor: 'white',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          {selectedCards.map((cardIndex, index) => (
            <div key={index}>
              <h2>카드 {index + 1} (번호: {cardIndex + 1})</h2>
              <p>이 카드의 해석은 ...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneralDetail;