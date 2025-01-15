import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './GeneralDetail.css';
import axios from 'axios';

const GeneralDetail = () => {
  const location = useLocation();
  const selectedCards = location.state?.selectedCards || []; // 기본값 설정
  const [aiResultsTotal, setAiResultsTotal] = useState([]); // 최근 4개의 AI 결과
  const [cardUrls, setCardUrls] = useState([]); // 최근 4개의 카드 URL
  const [selectedCardIndex, setSelectedCardIndex] = useState(null); // 현재 선택된 카드 인덱스

  // selectedCards 배열 구조 확인
  useEffect(() => {
    console.log('selectedCards:', selectedCards);
    selectedCards.forEach((card, index) => {
      console.log(`Card ${index}:`, card);
    });
  }, [selectedCards]);

  const convertGoogleDriveUrl = (url) => {
    try {
      console.log('Original URL:', url);
      // 이미 변환된 URL인지 확인
      if (url.includes('https://drive.google.com/uc?export=view&id=')) {
        console.log('Already converted URL:', url);
        return url;
      }
      const match = url.match(/\/file\/d\/([^/]+)\//);
      if (match && match[1]) {
        const convertedUrl = `https://drive.google.com/uc?export=view&id=${match[1]}`;
        console.log('Converted URL:', convertedUrl);
        return convertedUrl;
      }
      console.error('잘못된 Google Drive URL:', url);
      return url; // 잘못된 URL이면 원래 URL 반환
    } catch (error) {
      console.error('Google Drive URL 변환 중 오류:', error);
      return url;
    }
  };

  // 최근 AI 결과와 카드 URL 가져오기
  useEffect(() => {
    const fetchAiResultsAndCardUrls = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/latest-ai-results');
        console.log('Fetched AI results and card URLs:', response.data);
        setAiResultsTotal(response.data.aiResults.reverse() || []); // 결과를 역순으로 저장
        const convertedUrls = response.data.cardUrls.reverse().map(url => convertGoogleDriveUrl(url)); // URL을 변환하여 저장
        setCardUrls(convertedUrls);
      } catch (error) {
        console.error('Error fetching AI results and card URLs:', error);
      }
    };
    fetchAiResultsAndCardUrls();
  }, []);

  // cardUrls 배열 구조 확인
  useEffect(() => {
    console.log('cardUrls:', cardUrls);
  }, [cardUrls]);

  const handleCardClick = (index) => {
    console.log(`Clicked card index: ${index}`);
    setSelectedCardIndex(index); // 클릭한 카드의 인덱스 설정
  };

  return (
    <div className="tarot-purple">
      <div className="black-overlay">
        <div className="container-generaldetail">
          {/* 카드 배열 */}
          <div className="cards-spread-generaldetail">
            {selectedCards.map((card, index) => (
              <div 
                key={index} 
                className={`selected-card-generaldetail ${selectedCardIndex === index ? 'active' : ''}`}
                style={{
                  zIndex: `${5 + index}`,
                }}
                onClick={() => handleCardClick(index)}
              >
                <img
                  src={cardUrls[index]} // 변환된 이미지 URL 사용
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
                  src={cardUrls[selectedCardIndex]} // 변환된 이미지 URL 사용
                  alt={`Selected Tarot card ${selectedCardIndex + 1}`}
                  className="tarot-card-generaldetail"
                />
                <p style={{ fontSize: '8px' }}>
                  <strong>카드 이름:</strong> {selectedCards[selectedCardIndex].name}
                </p>
                <p style={{ fontSize: '8px' }}>
                  <strong>카드 의미:</strong> {aiResultsTotal[selectedCardIndex] || 'AI 결과 없음'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralDetail;