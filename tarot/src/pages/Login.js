import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            setMessage('모든 필드를 입력해주세dds요.');
            return;
        }
    
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                setMessage(data.message || '로그인 실패');
                return;
            }
    
            // 사용자 정보를 로컬 스토리지에 저장하고 My Page로 이동
            localStorage.setItem('loggedInUser', JSON.stringify(data.user));
            setMessage('로그인 성공!');
            navigate('/mypage'); // My Page로 이동
        } catch (error) {
            console.error('Login error:', error);
            setMessage('서버 에러 발생!');
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setMessage('모든 필드를 입력해주세요.');
            return;
        }

        // 회원가입 로직

        setMessage('회원가입 성공!');
        setIsRegister(false); // 회원가입 성공 후 로그인 폼으로 전환
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
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호"
                                required
                            />
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