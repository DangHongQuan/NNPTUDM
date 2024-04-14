import React, { useEffect, useState } from 'react';
import {Col, Container, Nav, Navbar, Row} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

import  navAdmin from "../component/NavAdmin"
import NavAdmin from "../component/NavAdmin";

interface Category {
    _id: string;
    name: string;
}
const CategoryAddAdmin: React.FC = () => {
    const [id, setId] = useState<number>();
    const [name, setName] = useState<string>('');


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



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Gửi request POST tới API để thêm category mới
            const response = await fetch('http://localhost:3000/api/v1/category/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, name })
            });

            if (!response.ok) {
                throw new Error('Error adding category');
            }

            alert('Category added successfully!');
            // Reset form fields sau khi thêm thành công
            setId(undefined);
            setName('');
        } catch (error) {
            // @ts-ignore
            alert('Error adding category: ' + error.message);
        }
    };

    return (
        <>
            <Container fluid>
                <Row className="vh-100">
                    <Col md={2} className="bg-primary">
                        <NavAdmin/>
                    </Col>
                    <Col md={10}>

                        <Container fluid className="mt-5">
                            <div>
                                <h2>Add Category</h2>
                                <form onSubmit={handleSubmit}>

                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button className="btn btn-primary" type="submit">Add Category</button>
                                </form>
                            </div>
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

export default CategoryAddAdmin;
