import React from 'react';
import './Couple.css';

const Couple = () => {
    return (
        <div className="tarot-purple">
            <div className="black-overlay">
                <div className="container-couple">
                    {/* Header */}
                    <a href="/checkmain" className="header-couple">
                        <img src="https://ifh.cc/g/018lPq.png" alt="Tarot" />
                    </a>

                    {/* Instruction */}
                    <h2 className="instruction-text">카드를 비어있는 공간에 가져오세요.</h2>

                    {/* Card Drop Zone */}
                    <div className="cards-wrapper">
                        <div className="cards-container left-container"></div>

                        <div className="drop-zone" id="drop-zone">
                            <div className="drop-placeholder">카드를 여기에 놓으세요</div>
                        </div>

                        <div className="cards-container right-container"></div>
                    </div>

                    {/* Reveal Button */}
                    <button className="selection-btn reveal-btn">카드 확인하기</button>

                    {/* Navigation Circles */}
                    <a href="/tarot-meaning" className="circle tarot-meaning">
                        <img src="https://ifh.cc/g/bgXtqd.png" alt="타로란" />
                    </a>
                    <a href="/today-fortune" className="circle today-fortune">
                        <img src="https://ifh.cc/g/TqQC50.png" alt="오늘의-운세" />
                    </a>
                    <a href="/couple-tarot" className="circle couple-tarot">
                        <img src="https://ifh.cc/g/NPR31l.png" alt="커플-궁합-타로" />
                    </a>

                    {/* Right Line Image */}
                    <div className="rightline-img">
                        <img src="https://ifh.cc/g/2aTXPo.png" alt="Right line" className="line-img" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Couple;
