import React, { useState, useEffect } from 'react';
import './Mypage.css';

const Mypage = () => {
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

    return (
        <div className="mypage-container">
            <h1>마이페이지</h1>
            <div className="profile">
                <img src={user.imageUrl || 'https://via.placeholder.com/150'} alt="Profile" className="profile-image" />
                <div className="info">
                    <p><strong>이름:</strong> {user.username}</p>
                    <p><strong>이메일:</strong> {user.email}</p>
                    <p><strong>비밀번호:</strong> {user.password}</p>
                    <p><strong>이미지 URL:</strong> {user.imageUrl}</p>
                </div>
            </div>
        </div>
    );
};

export default Mypage;
