import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cardImage from '../components/card_image.png'; // 카드 이미지 import
import './GeneralDetail.css';

const GeneralDetail = () => {
  const location = useLocation();
  const { selectedCards } = location.state;
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const navigate = useNavigate();
  console.log(selectedCards);

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };

  return (
    <div className="tarot-purple">
      <div className="black-overlay">
        <div className="container-generaldetail">
          {/* <h1>카드 해석 결과</h1> */}
          <div className="cards-spread-generaldetail">
            {selectedCards.map((cardIndex, index) => (
              <div 
                key={index} 
                className="selected-card-generaldetail"
                style={{
                  zIndex: `${5 + index}`,
                }}
                onClick={() => handleCardClick(index)}

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
          <div className="interpretation-box">
            {selectedCardIndex !== null && (
              <div className="interpretation-box-in">
                <img
                  src={cardImage}
                  alt={`Selected Tarot card ${selectedCardIndex + 1}`}
                  className="tarot-card-generaldetail"
                />
                <p>이 카드의 해석은 ...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralDetail;