import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './TodayDetail.css';
import sampleCardImage from '../components/card_image.png'; // 임의의 이미지 import

const TodayDetail = () => {
  const location = useLocation();
  const selectedCard = location.state?.selectedCard || { id: 1 }; // 단일 카드 상태, 기본값 설정
  const [cardUrl, setCardUrl] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const [showInterpretation, setShowInterpretation] = useState(false); // 해석창 상태

  useEffect(() => {
    // 임의의 카드 데이터 설정
    const cardData = {
      url: sampleCardImage,
      interpretation: '이 카드는 당신의 현재 상황을 나타냅니다. 긍정적인 변화를 기대하세요.',
    };
    setCardUrl(cardData.url);
    setInterpretation(cardData.interpretation);
  }, [selectedCard]);

  const handleCardClick = () => {
    setShowInterpretation(true); // 해석창 표시
  };

  return (
    <div className="tarot-purple-todaydetail">
      <div className="black-overlay">
        <div className="container-todaydetail">
          {/* 카드 */}
          <div className="card-todaydetail" onClick={handleCardClick}>
            <img
              src={cardUrl} // 임의의 이미지 URL 사용
              alt={`Selected Tarot card`}
              className="tarot-card-todaydetail"
            />
          </div>

          {/* 해석 텍스트 박스 */}
          {showInterpretation && (
            <div className="interpretation-box">
              <div className="interpretation-box-in">
                <img
                  src={cardUrl} // 임의의 이미지 URL 사용
                  alt={`Selected Tarot card`}
                  className="tarot-card-todaydetail"
                />
                <p style={{ fontSize: '14px' }}>
                  {interpretation}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodayDetail;