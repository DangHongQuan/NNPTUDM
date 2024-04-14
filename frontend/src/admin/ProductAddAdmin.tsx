import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Col, Container, Row} from "react-bootstrap";
import NavAdmin from "../component/NavAdmin";
import {useNavigate} from "react-router-dom";

interface Category {
    _id: string;
    name: string;
}

const ProductAddAdmin: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [id, setId] = useState<number>();
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>();
    const [imageUrl, setImageUrl] = useState<string>('');
    const [describe, setDescribe] = useState<string>('');
    const [categoryId, setCategoryId] = useState<string>('');
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
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/category');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories: ', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/v1/product/add', {

                name,
                price,
                imageUrl,
                describe,
                categoryId
            });
            alert('Product added successfully!');
            // Reset form fields sau khi thêm thành công

            setName('');
            setPrice(undefined);
            setImageUrl('');
            setDescribe('');
            setCategoryId('');
        } catch (error) {
            // @ts-ignore
            alert('Error adding product: ' + error.message);
        }
    };

    return (

        <Container fluid>
            <Row className="vh-100">
                <Col md={2} className="bg-primary">
                    <NavAdmin/>
                </Col>
                <Col md={10}>

                    <Container fluid className="mt-5">
                        <div className="container">
                            <h2>Add Product</h2>
                            <form onSubmit={handleSubmit}>

                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Price:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        value={price}
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="imageUrl">Image URL:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="imageUrl"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="describe">Describe:</label>
                                    <textarea
                                        className="form-control"
                                        id="describe"
                                        value={describe}
                                        onChange={(e) => setDescribe(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="categoryId">Category:</label>
                                    <select
                                        className="form-control"
                                        id="categoryId"
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(e.target.value)}
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Add Product</button>
                            </form>
                        </div>

                    </Container>
                </Col>
            </Row>
        </Container>

    );
};
function parseJwt(token: string) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

export default ProductAddAdmin;
