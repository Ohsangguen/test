// TarotCards.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TarotCards.css';
import today_logo from '../components/오늘의운세_logo.png';  
import tarotmeaning_logo from '../components/타로란_logo.png';  
import fourcard_logo from '../components/포카드_logo.png';  
import couple_logo from '../components/커플타로_logo.png';  
import TAROT_logo from '../components/TAROT.png';

import fool from '../components/넙죽타로카드/메이저 카드/0. the fool.png';
import magician from '../components/넙죽타로카드/메이저 카드/1. the magician.png';
import highPriestess from '../components/넙죽타로카드/메이저 카드/2. the high priestess.png';
import empress from '../components/넙죽타로카드/메이저 카드/3. the empress.png';
import emperor from '../components/넙죽타로카드/메이저 카드/4. the emperor.png';
import hierophant from '../components/넙죽타로카드/메이저 카드/5. the hierophant.png';
import lovers from '../components/넙죽타로카드/메이저 카드/6. the lovers.png';
import chariot from '../components/넙죽타로카드/메이저 카드/7. the chariot.png';
import strength from '../components/넙죽타로카드/메이저 카드/8. strength.png';
import hermit from '../components/넙죽타로카드/메이저 카드/9. the hermit.png';
import wheelOfFortune from '../components/넙죽타로카드/메이저 카드/10. wheel of fortune.png';
import justice from '../components/넙죽타로카드/메이저 카드/11. justice.png';
import hangedMan from '../components/넙죽타로카드/메이저 카드/12. the hanged man.png';
import death from '../components/넙죽타로카드/메이저 카드/13. death.png';
import temperance from '../components/넙죽타로카드/메이저 카드/14. temperance.png';
import devil from '../components/넙죽타로카드/메이저 카드/15. the devil.png';
import tower from '../components/넙죽타로카드/메이저 카드/16. the tower.png';
import star from '../components/넙죽타로카드/메이저 카드/17. the star.png';
import moon from '../components/넙죽타로카드/메이저 카드/18. the moon.png';
import sun from '../components/넙죽타로카드/메이저 카드/19. the sun.png';
import judgement from '../components/넙죽타로카드/메이저 카드/20. judgement.png';
import world from '../components/넙죽타로카드/메이저 카드/21. the world.png';

const TarotCards = () => {

    const majorArcana = [
        { id: 0, name: '광대 The Fool', imageUrl: fool },
        { id: 1, name: '마술사 The Magician', imageUrl: magician },
        { id: 2, name: '여사제 The High Priestess', imageUrl: highPriestess },
        { id: 3, name: '여제 The Empress', imageUrl: empress },
        { id: 4, name: '황제 The Emperor', imageUrl: emperor },
        { id: 5, name: '교황 The Hierophant', imageUrl: hierophant },
        { id: 6, name: '연인 The Lovers', imageUrl: lovers },
        { id: 7, name: '전차 The Chariot', imageUrl: chariot },
        { id: 8, name: '힘 Strength', imageUrl: strength },
        { id: 9, name: '은둔자 The Hermit', imageUrl: hermit },
        { id: 10, name: '운명의 수레바퀴 Wheel of Fortune', imageUrl: wheelOfFortune },
        { id: 11, name: '정의 Justice', imageUrl: justice },
        { id: 12, name: '매달린 남자 The Hanged Man', imageUrl: hangedMan },
        { id: 13, name: '죽음 Death', imageUrl: death },
        { id: 14, name: '절제 Temperance', imageUrl: temperance },
        { id: 15, name: '악마 The Devil', imageUrl: devil },
        { id: 16, name: '탑 The Tower', imageUrl: tower },
        { id: 17, name: '별 The Star', imageUrl: star },
        { id: 18, name: '달 The Moon', imageUrl: moon },
        { id: 19, name: '태양 The Sun', imageUrl: sun },
        { id: 20, name: '심판 Judgement', imageUrl: judgement },
        { id: 21, name: '세계 The World', imageUrl: world },
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
    const navigate = useNavigate();


    const handleCardTypeClick = () => {
        setShowCardTypes(!showCardTypes);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const closeOverlay = () => {
        setSelectedCard(null);
    };

    const handleTitleClick = () => {
        navigate('/');
      };

    return (
        <div className="tarot-purple-cards">
            <div className="black-overlay-cards">
            <div className="header-container-mean">
            <div className="main-title" onClick={handleTitleClick}>
                <img src={TAROT_logo} alt="TAROT Logo" className="main-title-text" />
            </div>
            <div className="header-options-mean">
                <a href="todayfortune" className="option-text-mean">오늘의 운세</a>
                <a href="fourcard" className="option-text-mean">포카드 타로</a>
                <a href="couple" className="option-text-mean">커플 타로</a>
            </div>
            </div>

            <div className="content-container-cards">
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
                        <div className="overlay" onClick={closeOverlay}>
                            <div className="overlay-content">
                                <h2>{selectedCard.name}</h2>
                                {selectedCard.imageUrl && (
                                    <img src={selectedCard.imageUrl} alt={selectedCard.name} className="selected-card-image" />
                                )}
                            </div>
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

