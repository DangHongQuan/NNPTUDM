import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
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
interface Category {
    _id: string;
    name: string;
}

const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Lấy _id của sản phẩm từ URL
    const [categories, setCategories] = useState<Category[]>([]);

    const [product, setProduct] = useState<Product | null>(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [describe, setDescribe] = useState('');
    const [categoryId, setCategoryId] = useState('');
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
    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/product/${id}`, {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: Product) => {

                setProduct(data);
                setName(data.name);
                setPrice(data.price);
                setImageUrl(data.imageUrl);
                setDescribe(data.describe);
                setCategoryId(data.categoryId);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    }, [id]);

    const handleUpdate = () => {
        fetch(`http://localhost:3000/api/v1/product/${id}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                price,
                imageUrl,
                describe,
                categoryId
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('Error updating product:', error);
            });
    };

    if (!product) {
        return <div>Loading...</div>;
    }


    return (
        <Container fluid>
            <Row className="vh-100">
                <Col md={2} className="bg-primary">
                    <NavAdmin/>
                </Col>
                <Col md={10}>

                    <Container fluid className="mt-5">
                        <div className="container">
                            <h1>Edit Product</h1>
                            <div className="form-group">
                                <label htmlFor="productName">Product Name:</label>
                                <input type="text" className="form-control" id="productName" value={name}
                                       onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="productPrice">Price:</label>
                                <input type="number" className="form-control" id="productPrice" value={price}
                                       onChange={(e) => setPrice(Number(e.target.value))}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="productImageUrl">Image URL:</label>
                                <input type="text" className="form-control" id="productImageUrl" value={imageUrl}
                                       onChange={(e) => setImageUrl(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="productDescription">Description:</label>
                                <input type="text" className="form-control" id="productDescription" value={describe}
                                       onChange={(e) => setDescribe(e.target.value)}/>
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
                            <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
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
export default EditProduct;
