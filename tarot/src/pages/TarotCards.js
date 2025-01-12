// TarotCards.jsx
import React, { useState } from 'react';
import './TarotCards.css';
import today_logo from '../components/오늘의운세_logo.png';  
import tarotmeaning_logo from '../components/타로란_logo.png';  
import fourcard_logo from '../components/포카드_logo.png';  
import couple_logo from '../components/커플타로_logo.png';  
import TAROT_logo from '../components/TAROT.png';


const TarotCards = () => {

    const majorArcana = [
        { id: 0, name: '광대 The Fool', imageUrl: '/images/fool.png' },
        { id: 1, name: '마술사 The Magician', imageUrl: '/images/magician.png' },
        { id: 2, name: '여사제 The High Priestess', imageUrl: '/images/high_priestess.png' },
        { id: 3, name: '여제 The Empress', imageUrl: '/images/empress.png' },
        { id: 4, name: '황제 The Emperor', imageUrl: '/images/emperor.png' },
        { id: 5, name: '교황 The Hierophant', imageUrl: '/images/hierophant.png' },
        { id: 6, name: '연인 The Lovers', imageUrl: '/images/lovers.png' },
        { id: 7, name: '전차 The Chariot', imageUrl: '/images/chariot.png' },
        { id: 8, name: '힘 Strength', imageUrl: '/images/strength.png' },
        { id: 9, name: '은둔자 The Hermit', imageUrl: '/images/hermit.png' },
        { id: 10, name: '운명의 수레바퀴 Wheel of Fortune', imageUrl: '/images/wheel_of_fortune.png' },
        { id: 11, name: '정의 Justice', imageUrl: '/images/justice.png' },
        { id: 12, name: '매달린 남자 The Hanged Man', imageUrl: '/images/hanged_man.png' },
        { id: 13, name: '죽음 Death', imageUrl: '/images/death.png' },
        { id: 14, name: '절제 Temperance', imageUrl: '/images/temperance.png' },
        { id: 15, name: '악마 The Devil', imageUrl: '/images/devil.png' },
        { id: 16, name: '탑 The Tower', imageUrl: '/images/tower.png' },
        { id: 17, name: '별 The Star', imageUrl: '/images/star.png' },
        { id: 18, name: '달 The Moon', imageUrl: '/images/moon.png' },
        { id: 19, name: '태양 The Sun', imageUrl: '/images/sun.png' },
        { id: 20, name: '심판 Judgement', imageUrl: '/images/judgement.png' },
        { id: 21, name: '세계 The World', imageUrl: '/images/world.png' }
      ];

    const minorArcana = [
        { id: 7, name: 'Wands : 창의성, 열정, 행동' },
        { id: 8, name: 'Cups : 감정, 관계, 사랑' },
        { id: 9, name: 'Swords : 지성, 갈등, 진실' },
        { id: 10, name: 'Pentacles : 물질적 세계, 재정, 건강' }
    ];

    const courtCards = [
        { id: 11, name: 'Page : 학습자, 신참자, 초기 단계' },
        { id: 12, name: 'Knight : 행동, 진전, 강한 의지' },
        { id: 13, name: 'Queen : 성숙함, 감정적 지혜' },
        { id: 14, name: 'King : 권위, 완성, 리더십' }
    ];

    const [showCardTypes, setShowCardTypes] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardTypeClick = () => {
        setShowCardTypes(!showCardTypes);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    return (
        <div className="tarot-purple">
            <div className="black-overlay">
                {/* 헤더 섹션 */}
                <div className="header-container-cards">
                <a href="main" className="title-logo">
                    <h1 className="main-title-text">TAROT</h1>
                </a>
                <div className="header-options">
                    <a href="todayfortune" className="option-text">오늘의 운세</a>
                    <a href="fourcard" className="option-text">포카드 타로</a>
                    <a href="couple" className="option-text">커플 타로</a>
                    <button onClick={() => {}} className="option-text">타로 카드 종류</button>
                </div>
            </div>

            {/* 콘텐츠 섹션 */}
            <div className="content-container-cards">
            {/* 왼쪽 사이드바 */}
                <div className="left-sidebar">
                    <a href="tarotmeaning" className="sidebar-item active">타로란?</a>
                    <a href="tarotcards" className="sidebar-item active">타로 카드 종류</a>
            </div>

            {/* Main Content */}
            <div className="main-content-cards">
                <div className="tarot-container">
                    <h1 className="tarot-title">타로 카드의 종류</h1>
                    <p className="tarot-description">
                        타로 카드는 총 78장으로 이루어져 있으며, <strong>메이저 아르카나 22장</strong>과 
                        <strong> 마이너 아르카나 56장</strong>으로 구성되어 있습니다.
                    </p>

                    {/* 메이저 아르카나 */}
                    <h2 className="section-title">메이저 아르카나</h2>
                    <div className="card-grid">
                        {majorArcana.map((card) => (
                            <div key={card.id} className="card-item" onClick={() => handleCardClick(card)}>
                                <p>{card.name}</p>
                            </div>
                        ))}
                    </div>

                    

                    {/* 마이너 아르카나 */}
                    <h2 className="section-title">마이너 아르카나</h2>
                    <p className="tarot-description">
                        마이너 아르카나는 다음의 <strong>네 개의 슈트(suits)</strong>로 나뉘며 각 슈트는 일상 생활의 다양한 측면을 상징합니다.
                    </p>
                    <div className="card-grid">
                        {minorArcana.map((card) => (
                            <div key={card.id} className="card-item" onClick={() => handleCardClick(card)}>
                                <p>{card.name}</p>
                            </div>
                        ))}
                    </div>

                    {/* 궁정 카드 */}
                    <h2 className="section-title">궁정 카드</h2>
                    <p className="tarot-description">

                    각 슈트는 <u>14장의 카드</u>로 구성되며, 에이스(Ace)부터 10까지의 <strong>번호 카드</strong>와
                    페이지(Page), 나이트(Knight), 퀸(Queen), 킹(King)의 <strong>궁정 카드(Court Cards)</strong>로 이루어져 있습니다.
                    궁정 카드의 각 계급은 다음과 같은 의미를 갖고 있습니다.
                    </p>

                    <div className="card-grid">
                        {courtCards.map((card) => (
                            <div key={card.id} className="card-item" onClick={() => handleCardClick(card)}>
                                <p>{card.name}</p>
                            </div>
                        ))}
                    </div>

                    {/* 선택한 카드 상세 정보 */}
                    {selectedCard && (
                        <div className="selected-card-detail">
                            <h2>{selectedCard.name}</h2>
                            {selectedCard.imageUrl && (
                                <img
                                    src={selectedCard.imageUrl}
                                    alt={selectedCard.name}
                                    className="selected-card-image"
                                />
                            )}
                        </div>
                    )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default TarotCards;

