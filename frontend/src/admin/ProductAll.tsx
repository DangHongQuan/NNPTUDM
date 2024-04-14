import React, { useEffect, useState } from 'react';
import {Col, Container, Nav, Navbar, Row} from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom";

import  navAdmin from "../component/NavAdmin"
import NavAdmin from "../component/NavAdmin";

interface Product {
    id: number;
    name: string;
    _id: string;

    price: number;
    imageUrl: string;
    describe: string;
    categoryId: string;
}
const ProductAll: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

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

        fetch('http://localhost:3000/api/v1/product', {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: Product[]) => {

                setProducts(data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);


    const handleDelete = async (productId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/product/${productId}/delete`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
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
                            {/* Your dashboard content goes here */}
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>iamge </th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td><img src={product.imageUrl}  style={{width: " 50px"}}/></td>
                                        <td>{product.price}</td>
                                        <td>{product.describe}</td>
                                        <td>
                                            <button className="btn btn-primary me-3">
                                                <Link to={`/product/edit/${product._id}`}><span className="text-white">Edit</span></Link>
                                            </button>
                                            <button className="btn btn-danger mt-2" onClick={() => handleDelete(product._id)}><span className="text-white">Delete</span></button>
                                        </td>
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

export default ProductAll;
