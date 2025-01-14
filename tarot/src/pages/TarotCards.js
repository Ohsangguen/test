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

import Wand1 from '../components/넙죽타로카드/완드(1-10)/Wand1.PNG';
import Wand2 from '../components/넙죽타로카드/완드(1-10)/Wand2.PNG';
import Wand3 from '../components/넙죽타로카드/완드(1-10)/Wand3.PNG';
import Wand4 from '../components/넙죽타로카드/완드(1-10)/Wand4.PNG';
// import Wand5 from '../components/넙죽타로카드/완드(1-10)/Wand5.PNG';
import Wand6 from '../components/넙죽타로카드/완드(1-10)/Wand6.PNG';
import Wand7 from '../components/넙죽타로카드/완드(1-10)/Wand7.PNG';
import Wand8 from '../components/넙죽타로카드/완드(1-10)/Wand8.PNG';
import Wand9 from '../components/넙죽타로카드/완드(1-10)/Wand9.PNG';
import Wand10 from '../components/넙죽타로카드/완드(1-10)/Wand10.PNG';

import Cup1 from '../components/넙죽타로카드/컵(1-10)/Cup1.PNG';
import Cup2 from '../components/넙죽타로카드/컵(1-10)/Cup2.PNG';
import Cup3 from '../components/넙죽타로카드/컵(1-10)/Cup3.PNG';
import Cup4 from '../components/넙죽타로카드/컵(1-10)/Cup4.PNG';
import Cup5 from '../components/넙죽타로카드/컵(1-10)/Cup5.PNG';
import Cup6 from '../components/넙죽타로카드/컵(1-10)/Cup6.PNG';
import Cup7 from '../components/넙죽타로카드/컵(1-10)/Cup7.PNG';
import Cup8 from '../components/넙죽타로카드/컵(1-10)/Cup8.PNG';
import Cup9 from '../components/넙죽타로카드/컵(1-10)/Cup9.PNG';
import Cup10 from '../components/넙죽타로카드/컵(1-10)/Cup10.PNG';

// Importing Pentacles images
import Pentacle1 from '../components/넙죽타로카드/펜타클(1-10)/Pentacle1.PNG';
import Pentacle2 from '../components/넙죽타로카드/펜타클(1-10)/Pentacle2.PNG';
import Pentacle3 from '../components/넙죽타로카드/펜타클(1-10)/Pentacle3.PNG';
import Pentacle4 from '../components/넙죽타로카드/펜타클(1-10)/Pentacle4.PNG';
import Pentacle5 from '../components/넙죽타로카드/펜타클(1-10)/Pentacle5.PNG';
import Pentacle6 from '../components/넙죽타로카드/펜타클(1-10)/Pentacle6.PNG';
import Pentacle7 from '../components/넙죽타로카드/펜타클(1-10)/Pentacle7.PNG';
import Pentacle8 from '../components/넙죽타로카드/펜타클(1-10)/Pentacle8.PNG';
import Pentacle9 from '../components/넙죽타로카드/펜타클(1-10)/Pentacle9.PNG';
import Pentacle10 from '../components/넙죽타로카드/펜타클(1-10)/Pentacle10.PNG';

// Importing Swords images
import Sword1 from '../components/넙죽타로카드/소드(1-10)/Sword1.PNG';
import Sword2 from '../components/넙죽타로카드/소드(1-10)/Sword2.png';
import Sword3 from '../components/넙죽타로카드/소드(1-10)/Sword3.png';
import Sword4 from '../components/넙죽타로카드/소드(1-10)/Sword4.png';
import Sword5 from '../components/넙죽타로카드/소드(1-10)/Sword5.png';
import Sword6 from '../components/넙죽타로카드/소드(1-10)/Sword6.png';
import Sword7 from '../components/넙죽타로카드/소드(1-10)/Sword7.png';
import Sword8 from '../components/넙죽타로카드/소드(1-10)/Sword8.png';
import Sword9 from '../components/넙죽타로카드/소드(1-10)/Sword9.png';
import Sword10 from '../components/넙죽타로카드/소드(1-10)/Sword10.png';

import KingOfCups from '../components/넙죽타로카드/마이너 직업 카드/King of cups.png';
import KingOfPentacles from '../components/넙죽타로카드/마이너 직업 카드/King of pentacles.png';
import KingOfSwords from '../components/넙죽타로카드/마이너 직업 카드/King of swords.png';
import KingOfWands from '../components/넙죽타로카드/마이너 직업 카드/King of wands.png';

import KnightOfCups from '../components/넙죽타로카드/마이너 직업 카드/Knight of cups.png';
import KnightOfPentacles from '../components/넙죽타로카드/마이너 직업 카드/Knight of pentacles.png';
import KnightOfSwords from '../components/넙죽타로카드/마이너 직업 카드/Knight of swords.png';
import KnightOfWands from '../components/넙죽타로카드/마이너 직업 카드/Knight of wands.png';

import PageOfCups from '../components/넙죽타로카드/마이너 직업 카드/Page of cups.png';
import PageOfPentacles from '../components/넙죽타로카드/마이너 직업 카드/Page of pentacles.png';
import PageOfSwords from '../components/넙죽타로카드/마이너 직업 카드/Page of swords.png';
import PageOfWands from '../components/넙죽타로카드/마이너 직업 카드/Page of wands.png';

import QueenOfCups from '../components/넙죽타로카드/마이너 직업 카드/Queen of cups.png';
import QueenOfPentacles from '../components/넙죽타로카드/마이너 직업 카드/Queen of pentacles.png';
import QueenOfSwords from '../components/넙죽타로카드/마이너 직업 카드/Queen of swords.png';
import QueenOfWands from '../components/넙죽타로카드/마이너 직업 카드/Queen of wands.png';


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
        { 
            id: 7, 
            name: 'Wands : 창의성, 열정, 행동',
            images: [Wand1, Wand2, Wand3, Wand4, Wand6, Wand7, Wand8, Wand9, Wand10]
        },
        { 
            id: 8, 
            name: 'Cups : 감정, 관계, 사랑',
            imagesUrl: [Cup1, Cup2, Cup3, Cup4, Cup5, Cup6, Cup7, Cup8, Cup9, Cup10]
        },
        { 
            id: 9, 
            name: 'Swords : 지성, 갈등, 진실',
            images: [Sword1, Sword2, Sword3, Sword4, Sword5, Sword6, Sword7, Sword8, Sword9, Sword10]
        },
        { 
            id: 10, 
            name: 'Pentacles : 물질적 세계, 재정, 건강',
            images: [Pentacle1, Pentacle2, Pentacle3, Pentacle4, Pentacle5, Pentacle6, Pentacle7, Pentacle8, Pentacle9, Pentacle10]
        }
    ];

    const courtCards = [
        { 
            id: 11, 
            name: 'Page : 학습자, 신참자, 초기 단계',
            images: [PageOfCups, PageOfPentacles, PageOfSwords, PageOfWands]
        },
        { 
            id: 12, 
            name: 'Knight : 행동, 진전, 강한 의지',
            images: [KnightOfCups, KnightOfPentacles, KnightOfSwords, KnightOfWands]
        },
        { 
            id: 13, 
            name: 'Queen : 성숙함, 감정적 지혜',
            images: [QueenOfCups, QueenOfPentacles, QueenOfSwords, QueenOfWands]
        },
        { 
            id: 14, 
            name: 'King : 권위, 완성, 리더십',
            images: [KingOfCups, KingOfPentacles, KingOfSwords, KingOfWands]
        }
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
                            <div className={`overlay-content ${selectedCard.images ? 'multiple-images' : 'single-image'}`}>
                                <h2>{selectedCard.name}</h2>
                                {selectedCard.imageUrl && (
                                    <img src={selectedCard.imageUrl} alt={selectedCard.name} className="selected-card-image" />
                                )}
                                {selectedCard.images && selectedCard.images.map((image, index) => (
                                    <img key={index} src={image} alt={`${selectedCard.name} ${index + 1}`} className="selected-card-image" />
                                ))}
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

