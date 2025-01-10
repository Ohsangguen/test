import React, { useState } from 'react';
import './Fourcard.css';
import cardimage from '../components/card_image.png';


const Fourcard = () => {
    const [selectedScreen, setSelectedScreen] = useState('selection');

    const handleSelectionClick = (type) => {
        console.log(`${type} selected`);
        setSelectedScreen('tarot');
    };

    return (
        <div className="tarot-purple-four">
             <div className="black-overlay-four">

                {selectedScreen === 'selection' && (
                    <div id="selection-screen" className="screen active">
                        <h1>타로 리딩을 선택하세요</h1>
                        <div className="subject-image">
                            <img src="주제-정하기.png" alt="주제 정하기" />
                        </div>
                        <div className="options-container">
                            <div className="selection-options">
                            <div className="card-container" onClick={() => handleSelectionClick('general')}>
                                <div className="card-content">
                                    <img src={cardimage} alt="일반운" className="card-image-four" />
                                    <p className="card-text">일반운</p>
                                </div>
                            </div>
                            <div className="card-container" onClick={() => handleSelectionClick('love')}>
                                <div className="card-content">
                                    <img src={cardimage} alt="연애운" className="card-image-four" />
                                    <p className="card-text">연애운</p>
                                </div>
                            </div>
                            <div className="card-container" onClick={() => handleSelectionClick('money')}>
                                <div className="card-content">
                                    <img src={cardimage} alt="금전운" className="card-image-four" />
                                    <p className="card-text">금전운</p>
                                </div>
                            </div>
                            </div>
                        <div className="subject-image"></div>
                    </div>
                </div>
            )}
            </div>

            {selectedScreen === 'tarot' && (
                <div id="tarot-screen" className="screen-four">
                    <div className="black-overlay-four">
                        <div className="container-four">
                            <a href="/explanation" className="heade-four">
                                <img src="https://ifh.cc/g/018lPq.png" alt="Tarot" />
                            </a>
                            <h2 className="instruction-text">카드 4장을 골라주세요.</h2>

                            <div className="cards-container"></div>

                            <button className="selection-btn reveal-btn">카드 확인하기</button>

                            <a href="/tarot-meaning" className="circle tarot-meaning">
                                <img src="https://ifh.cc/g/bgXtqd.png" alt="타로란" />
                            </a>
                            <a href="/today-fortune" className="circle today-fortune">
                                <img src="https://ifh.cc/g/TqQC50.png" alt="오늘의-운세" />
                            </a>
                            <a href="/couple-tarot" className="circle couple-tarot">
                                <img src="https://ifh.cc/g/NPR31l.png" alt="커플-궁합-타로" />
                            </a>

                            <div className="leftpattern-img">
                                <img src="https://ifh.cc/g/n5Q1nw.png" alt="Left Pattern" className="pattern-img" />
                            </div>
                            <div className="rightpattern-img">
                                <img src="https://ifh.cc/g/P23tkZ.png" alt="Right Pattern" className="pattern-img-r" />
                            </div>
                            <div className="rightline-img">
                                <img src="https://ifh.cc/g/2aTXPo.png" alt="Right line" className="line-img" />
                            </div>
                            <div className="card-selection-container">
                                <img src="카드-고르기.png" alt="카드 고르기" className="card-selection-img" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Fourcard;
