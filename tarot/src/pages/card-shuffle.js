// card-shuffle.js
// 타로 카드 데이터와 셔플 기능을 제공하는 모듈

// 타로 카드 데이터 (예제 데이터, 필요시 추가 가능)
export const cards = [
    {
        id: 0,
        name: '광대 The Fool',
        front: '/images/fool_front.png',
        back: '/images/card_back.png',
        description: {
            upright: '새로운 시작, 순수함, 모험',
            reversed: '무모함, 계획 부족, 위험'
        }
    },
    {
        id: 1,
        name: '마술사 The Magician',
        front: '/images/magician_front.png',
        back: '/images/card_back.png',
        description: {
            upright: '창의력, 잠재력, 기술 사용',
            reversed: '기만, 재능 낭비, 혼란'
        }
    },
    {
        id: 2,
        name: '여사제 The High Priestess',
        front: '/images/high_priestess_front.png',
        back: '/images/card_back.png',
        description: {
            upright: '직관, 내면의 지혜, 신비',
            reversed: '비밀, 착각, 지혜 부족'
        }
    }
    // 나머지 카드 데이터 추가 가능
];

// 카드 섞기 (Fisher-Yates Shuffle 알고리즘 사용)
export const shuffleCards = () => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]]; // 요소 교환
    }
    return shuffled;
};

// 카드 한 장 뽑기 (셔플된 카드 중 하나 선택)
export const drawOneCard = () => {
    const shuffledCards = shuffleCards();
    return shuffledCards[0]; // 첫 번째 카드 반환
};
