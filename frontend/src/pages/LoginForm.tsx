import React, { useState } from 'react';

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            // Lưu token vào local storage hoặc state để sử dụng cho các yêu cầu sau này
            const data = await response.json();
            localStorage.setItem('token', data.token);

            // Thực hiện các hành động tiếp theo sau khi đăng nhập thành công, ví dụ: chuyển hướng người dùng đến trang chính
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label>
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
