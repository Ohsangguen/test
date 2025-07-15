import React, { useState, useEffect } from 'react';
import './Main.css';
import cardimage from '../components/card_image2.png';
import TAROT_logo from '../components/TAROT.png';
import { useNavigate } from 'react-router-dom';
import mypageimg from '../components/캐릭터 포즈 모음/타로넙죽-6.png'
import leftsymbol from '../components/leftsymbol.png';
import rightsymbol from '../components/rightsymbol.png';



const Main = () => {
    
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 관리하는 상태 변수

    useEffect(() => {
        const checkLoginStatus = async () => {
          try {
            // 로그인 상태를 확인하는 API 호출 (예: /api/check-login)
            const response = await fetch('/api/check-login');
            const data = await response.json();
            setIsLoggedIn(data.isLoggedIn);
          } catch (error) {
            console.error('Error checking login status:', error);
          }
        };
    
        checkLoginStatus();
      }, []);


    const handleTitleClick = () => {
        if (isLoggedIn) {
        navigate('/'); // 로그인 상태이면 메인 페이지로 이동
        } else {
        navigate('/login'); // 로그인 상태가 아니면 로그인 페이지로 이동
        }
    };

    const handleLoginClick = () => {
        navigate('/login'); // 로그인 페이지로 이동
    };

    const handleCenterCardClick = () => {
        if (isLoggedIn) {
          navigate('/mypage'); // 로그인 상태이면 마이페이지로 이동
        } else {
          navigate('/login'); // 로그인 상태가 아니면 로그인 페이지로 이동
        }
    };
    
    const handleOtherButtonClick = (path) => {
        if (isLoggedIn) {
          navigate(path); // 로그인 상태이면 해당 경로로 이동
        } else {
          navigate('/login'); // 로그인 상태가 아니면 로그인 페이지로 이동
        }
    };

    return (
        <div className="tarot-purple">
            <div className="black-overlay">
                <div className="container-main">
                    {/* Header */}
                     <div className="main-title-contain" onClick={handleTitleClick}>
                        <img src={TAROT_logo} alt="TAROT Logo" className="main-title-text-main" />
                    </div>

                    {/* <div className="login-button" onClick={handleLoginClick}>
                        로그인
                    </div> */}

                    {/* Navigation Cards */}

                    <div className="cards-wrapper-main">
                    {[
                        { link: "/tarotmeaning", text: "타로란?", position: "leftupcard", image: cardimage},
                        { link: "/todayfortune", text: "오늘의 운세", position: "rightupcard", image: cardimage},
                        { link: "/fourcard", text: "포카드 타로", position: "leftdowncard", image: cardimage},
                        { link: "/couple", text: "커플 궁합 타로", position: "rightdowncard", image: cardimage},
                        { link: "/mypage", text: "", position: "centercard", image: mypageimg, onClick: handleCenterCardClick}

                    ].map(({ link, text, position, image}) => (
                        <a href={link} className={`card-container-main ${position}-container`} key={position}>
                        <p className="card-text-main">{text}</p>
                        <img 
                            src={image} 
                            alt="Tarot Card" 
                            className="card-image-main" 
                        />
                        </a>
                    ))}
                    </div>


                    {/* Center Image */}
                    <div className="center-main">
                        <img src="https://ifh.cc/g/xXF5yV.png" alt="Moon and Star Illustration" className="midle-image" />
                    </div>

                    {/* <div className="leftsymbol-container">
                        <img src={leftsymbol} alt="Left Symbol" className="leftsymbol-img" />
                    </div>
                    <div className="rightsymbol-container">
                        <img src={rightsymbol} alt="Right Symbol" className="rightsymbol-img" />
                    </div> */}

                    <div className="leftline-img">
                        <img src="https://ifh.cc/g/p5tpLK.png" alt="Left Line" className="line-img" />
                    </div>
                    <div className="rightline-img">
                        <img src="https://ifh.cc/g/2aTXPo.png" alt="Right Line" className="line-img" />
                    </div> 

                    {/*                     
                    <div className="leftsymbol-img">
                        <img src="https://ifh.cc/g/xzRXAh.png" alt="Left Symbol" className="leftsymbol-img" />
                    </div>
                    <div className="rightsymbol-img">
                        <img src="https://ifh.cc/g/ZCff7F.png" alt="Right Symbol" className="rightsymbol-img" />
                    </div>
                    <div className="leftline-img">
                        <img src="https://ifh.cc/g/p5tpLK.png" alt="Left Line" className="line-img" />
                    </div>
                    <div className="rightline-img">
                        <img src="https://ifh.cc/g/2aTXPo.png" alt="Right Line" className="line-img" />
                    </div> */}

                </div>
            </div>
        </div>
    );
};

export default Main;
