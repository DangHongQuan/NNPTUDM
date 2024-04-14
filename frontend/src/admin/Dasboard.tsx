import React, { useEffect, useState } from 'react';
import {Col, Container, Nav, Navbar, Row} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

import  navAdmin from "../component/NavAdmin"
import NavAdmin from "../component/NavAdmin";


const Dasboard: React.FC = () => {
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


    return (
        <>
            <Container fluid>
                <Row className="vh-100">
                    <Col md={2} className="bg-primary">
                       <NavAdmin/>
                    </Col>
                    <Col md={10}>

                        <Container fluid className="mt-5">
                            {/* Your dashboard content goes here */}
                            <h2>Welcome to the Dashboard</h2>
                            <p>This is a simple admin dashboard layout.</p>
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

export default Dasboard;
