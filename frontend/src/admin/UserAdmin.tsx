import React, { useEffect, useState } from 'react';
import {Col, Container, Nav, Navbar, Row} from 'react-bootstrap';

import NavAdmin from "../component/NavAdmin";
import {useNavigate} from "react-router-dom";
interface User {
    _id: string,
    username: string,
    email: string,
    role: string,
}


const UserAdmin: React.FC = () => {
    const [user, setUser] = useState<User[]>([]);
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
    }, []);
    useEffect(() => {


        if (token) {
            const decodedToken: any = parseJwt(token);
            setUserRole(decodedToken.role);

        }

    }, []);
    useEffect(() => {
        if (userRole === "user") {

            navigate("/")
        }
    }, [userRole, navigate]);

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/user/getall', {
            method: 'GET'
        }).then(response => {
            if (!response.ok) {
                throw new Error('Nerwork pesponse was not ok')
            }
            return response.json();
        })
            .then((data: User[]) => {
                setUser(data)
            })


    }, []);


    return (
        <>
            <Container fluid>
                <Row className="vh-100">
                    <Col md={2} className="bg-primary">
                        <NavAdmin/>
                    </Col>
                    <Col md={10}>

                        <Container fluid className="mt-5">

                            <table  className="table" >
                                <thead>
                                <tr>
                                    <th>UserName</th>
                                    <th>Email</th>
                                    <th>Role</th>

                                </tr>
                                </thead>


                            <tbody >
                            {user.map(user => (
                                <tr>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>


                                </tr>
                            ))}
                            </tbody>
                            </table>
                        </Container>
                    </Col>
                </Row>
            </Container>

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


export default UserAdmin;
