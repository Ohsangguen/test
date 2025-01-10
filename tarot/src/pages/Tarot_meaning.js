// TarotExplanation.jsx
import React from 'react';
import './Tarot_meaning.css';

const Tarot_meaning = () => {
  return (
    <div className="tarot-purple-mean">
      <div className="black-overlay">
        <div id="first-line">
          <div className="title">
            <a href="checkmain.html">
              <img src="TAROT.png" alt="title" className="main-title" />
            </a>
          </div>
          <div>
            <img src="우측-상단-선.png" alt="Right line" className="line-img" />
            <div id="options">
              <a href="today-fortune.html" className="center">
                <img src="오늘의-운세.png" alt="오늘의 운세" className="option" />
              </a>
              <a href="4card-tarot.html" className="center">
                <img src="포카드-타로.png" alt="포카드 타로" className="option" />
              </a>
              <a href="couple-tarot.html" className="center">
                <img src="커플-궁합-타로.png" alt="커플 궁합 타로" className="option" />
              </a>
            </div>
          </div>
        </div>

        <div className="scrollBar">
          <div id="second-line">
            <div className="left-option-and-design center">
              <img src="좌측-선택창-테두리.png" alt="Left Option Border" className="left-option-line" />
              <br />
              <a href="tarot-meaning.html" className="center">
                <img src="타로란-좌측.png" alt="타로란" className="left-options left-option-now" />
              </a>
              <br />
              <a href="explanation_of_card.html" className="center">
                <img src="타로-카드-종류.png" alt="타로 카드 종류" className="left-options" id="left-option-card-ex" />
              </a>
              <br />
              <img src="좌측-선택창-테두리.png" alt="Left Option Border" className="left-option-line" />
              <br />
              <img src="좌측-무늬.png" alt="Moon" className="moon" />
              <br />
              <img src="좌측-하단-무늬.png" alt="Sun" className="sun" />
            </div>

            <div className="center user-wrap">
              <div className="user-wrap img">
                <img src="타로-설명란-어두운-부분.png" alt="Tarot Explanation Background" />
              </div>
              <div className="user-text">
                <h1 className="f-color">타로란?</h1>
                <h3>
                  타로(Tarot)는 <t>78장의 카드</t>로 이루어진 카드 세트로, 주로 점을 치거나 자기 성찰을 위한 도구로 사용됩니다.
                  <br />
                  타로 카드는 크게 <t>메이저 아르카(Major Arcana)</t>와 <t>마이너 아르카나(Minor Arcana)</t>로 나뉩니다.
                  <br />
                  메이저 아르카나는 <u>중요한 인생의 사건과 주제</u>를 상징하고, 마이너 아르카나는 <u>일상적인 사건과 감정</u>을 나타냅니다.
                </h3>
                <h1 className="f-color">타로의 역사</h1>
                <h3>
                  타로의 역사는 <t>중세 유럽</t>으로 거슬러 올라갑니다.
                  <br />
                  최초의 타로카드는 15세기 이탈리아에서 놀이 카드로 사용되었으며, <u>'타로키니(Tarocchini)'</u> 혹은 <u>'타로치(Tarocchi)'</u>라는 이름으로 불렸습니다.
                  <br />
                  <t>18세기 후반</t>에 이르러 타로는 점성술과 연결되면서 <t>점술 도구</t>로써의 기능이 강조되기 시작하였고,
                  <br />
                  프랑스의 점성술사인 장 밥티스트 알리에트(Jean-Baptiste Alliette), 일명 에테이라(Etteilla)는 타로를 체계적으로 연구하고 해석하는 방식을 개발하였습니다.
                  <br />
                  이후 타로 카드는 여러 문화와 시대를 거치면서 <t>다양한 해석과 방식으로 발전</t>해왔으며, 오늘날에는 <t>자기성찰, 명상, 점술</t> 등 다양한 용도로 사용되고 있습니다.
                </h3>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Tarot_meaning;
