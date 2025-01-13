import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const displayMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(''), 3000);
    };

    const resetFields = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setProfileImage('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            displayMessage('모든 필드를 입력해주세요.');
            return;
        }

        console.log('API URL:', API_URL);

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                displayMessage(errorData.message || '로그인 실패');
                console.error('API Error:', errorData);
                return;
            }

            const data = await response.json();
            console.log('Login Response Data:', data);
            localStorage.setItem('loggedInUser', JSON.stringify(data.user));
            displayMessage('로그인 성공!');
            resetFields();
            navigate('/mypage');
        } catch (error) {
            console.error('Login error:', error.message || error);
            displayMessage('서버 에러 발생!');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            displayMessage('모든 필드를 입력해주세요.');
            return;
        }

        console.log('API URL:', API_URL);

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, profileImage }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                displayMessage(errorData.message || '회원가입 실패');
                console.error('API Error:', errorData);
                return;
            }

            const data = await response.json();
            console.log('Register Response Data:', data);
            displayMessage('회원가입 성공!');
            resetFields();
            setIsRegister(false);
        } catch (error) {
            console.error('Register error:', error.message || error);
            displayMessage('서버 에러 발생!');
        }
    };

    return (
        <div className="tarot-purple">
            <div className="black-overlay">
                <div className={`login-container ${isRegister ? 'extend' : ''}`}>
                    <h2>{isRegister ? '회원가입' : '로그인'}</h2>
                    <form onSubmit={isRegister ? handleRegister : handleLogin} className="login-form">
                        {isRegister && (
                            <div className="form-group">
                                <label htmlFor="username">사용자 이름</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="사용자 이름"
                                    required
                                />
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="email">이메일</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">비밀번호</label>
                            <div className="password-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="비밀번호"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="show-password-button"
                                >
                                    {showPassword ? '숨기기' : '보기'}
                                </button>
                            </div>
                        </div>

                        {isRegister && (
                            <div className="form-group">
                                <label htmlFor="profileImage">프로필 이미지 URL (선택)</label>
                                <input
                                    type="text"
                                    value={profileImage}
                                    onChange={(e) => setProfileImage(e.target.value)}
                                    placeholder="프로필 이미지 URL (선택)"
                                />
                            </div>
                        )}
                        <button type="submit" className="submit-button">
                            {isRegister ? '회원가입' : '로그인'}
                        </button>
                    </form>
                    {message && <p className="message">{message}</p>}
                    <button onClick={() => setIsRegister(!isRegister)} className="toggle-button">
                        {isRegister ? '로그인 페이지로' : '회원가입 페이지로'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
