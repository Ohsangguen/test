import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mypage.css';
import neob from '../components/캐릭터 포즈 모음/타로넙죽-8.png';
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
      setUser({
        username: loggedUser.username,
        email: loggedUser.email,
        password: loggedUser.password,
        imageUrl: 'https://ifh.cc/g/jJ2HQs.jpg' // profile_image를 imageUrl로 매핑
      });
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
        <div className="mypage-container">
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
