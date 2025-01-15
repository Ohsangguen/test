import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mypage.css';
import neob from '../components/캐릭터 포즈 모음/타로넙죽-8.png'
import TAROT_logo from '../components/TAROT.png';

const Mypage = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        imageUrl: ''
    });

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedUser) {
            setUser(loggedUser);
        }
    }, []);

    const handleTitleClick = () => {
        navigate('/');
      };

    return (
        <div className="tarot-purple-mypage">
            <div className="black-overlay-mypage">
                <div className="main-title-left-mypage" onClick={handleTitleClick}>
                    <img src={TAROT_logo} alt="TAROT Logo" className="main-title-text-left-mypage" />
                </div>
                {/* <div className="tarot-title-mypage">Welcome to Tarot World !</div>
                <div className="neob-container">
                    <img src={neob} alt="Neob" className="neob-image" />
                </div> */}
                <div className="mypage-container">
                    
                    {/* <h1>마이페이지</h1> */}
                    <div className="profile">
                        <img src={user.imageUrl || 'https://via.placeholder.com/150'} alt="Profile" className="profile-image" />
                        <div className="info">
                            <p><strong>이름:</strong> {user.username}</p>
                            <p><strong>이메일:</strong> {user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mypage;
