import React, { useEffect, useState } from 'react';
import {Col, Container, Nav, Navbar, Row} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

import  navAdmin from "../component/NavAdmin"
import NavAdmin from "../component/NavAdmin";
import axios from "axios";


const CartAdmin: React.FC = () => {
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [cartItems, setCartItems] = useState<any[]>([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/cart');
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);
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
                            <h2>Thông tin đặc hàng</h2>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>totalPrice</th>
                                    <th>phone</th>
                                    <th>address</th>

                                </tr>
                                </thead>
                                <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.nameProduct}</td>
                                        <td>{item.totalPrice.toLocaleString('vi-VN')}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phone}</td>


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

export default CartAdmin;
