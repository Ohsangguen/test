// TodayDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TodayDetail.css';

const TodayDetail = () => {
  const { cardId } = useParams(); // URL에서 cardId 파라미터 추출
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 페이지가 로드될 때, 백엔드 API 호출하여 카드 데이터 가져오기
    const fetchCardData = async () => {
      try {
        const response = await fetch(`/api/card/${cardId}`); // 카드 정보를 제공하는 API 엔드포인트
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, [cardId]);

  if (loading) {
    return <div className="today-detail-container">Loading...</div>;
  }

  if (error) {
    return <div className="today-detail-container">Error: {error}</div>;
  }

  return (
    <div className="today-detail-container">
      {cardData && (
        <div className="card-detail">
          <img 
            src={cardData.imageUrl} 
            alt={`Card ${cardId}`} 
            className="card-image" 
          />
          <div className="card-interpretation">
            {cardData.interpretation}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayDetail;
