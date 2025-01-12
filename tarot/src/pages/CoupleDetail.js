import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shuffleCards, drawOneCard } from './card-shuffle.js';

const CoupleDetail = () => {
    const [cards, setCards] = useState(shuffleCards());
    const [selectedCards, setSelectedCards] = useState([]);
    const navigate = useNavigate();

    const handleDrawCard = () => {
        if (selectedCards.length < 9) {
            const card = drawOneCard();
            setSelectedCards([...selectedCards, card]);
        }
    };

    const handleRevealCards = () => {
        navigate('/couple-result', { state: { selectedCards } });
    };


    return (
        <div>
            <h1>커플 타로 카드</h1>
            <button onClick={handleDrawCard} disabled={selectedCards.length >= 9}>
                카드 한 장 뽑기
            </button>
            {selectedCards.length === 9 && (
                <button onClick={handleRevealCards}>카드 확인하기</button>
            )}
            <div>
                {selectedCards.map((card, index) => (
                    <div key={index}>
                        <h2>뽑은 카드: {card.name}</h2>
                        <img src={card.front} alt={card.name} />
                        <p>{card.description.upright}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default CoupleDetail;
