import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";




const Dasboard: React.FC = () => {
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        // Lấy thông tin về vai trò của người dùng từ token JWT
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken: any = parseJwt(token);
            setUserRole(decodedToken.role);
        }

    }, []);
    useEffect(() => {
        if (userRole !== 'admin') {
            navigate('/');
        }
    }, [userRole, navigate]);
    return (
        <>
            <div>
                <h1>admin</h1>

            </div>
        </>
    );
};

function parseJwt(token: string) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

export default Dasboard;
