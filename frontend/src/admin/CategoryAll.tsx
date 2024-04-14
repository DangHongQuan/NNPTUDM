import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import NavAdmin from "../component/NavAdmin";
interface Category {
    _id: string;
    name: string;
}

const CategoryAll: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [editedCategory, setEditedCategory] = useState<Category | null>(null);
    const [editedCategoryName, setEditedCategoryName] = useState('');
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
        fetch('http://localhost:3000/api/v1/category')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCategories(data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleEdit = (category: Category) => {
        setEditedCategory(category);
        setEditedCategoryName(category.name);
        // Hiển thị modal chỉnh sửa
        const modal = document.getElementById('editModal');
        if (modal) {
            modal.style.display = 'block';
        }
    };

    const handleSave = async () => {
        if (!editedCategory) return;

        try {
            const response = await fetch(`http://localhost:3000/api/v1/category/${editedCategory._id}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: editedCategoryName })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedCategory = await response.json();
            setCategories(prevCategories => prevCategories.map(category => {
                if (category._id === updatedCategory._id) {
                    return updatedCategory;
                }
                return category;
            }));
            // Đóng modal chỉnh sửa sau khi lưu thành công
            const modal = document.getElementById('editModal');
            if (modal) {
                modal.style.display = 'none';
            }
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleDelete = async (categoryId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/category/${categoryId}/delete`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setCategories(prevCategories => prevCategories.filter(category => category._id !== categoryId));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };


    return (
        <>
            <Container fluid>
                <Row className="vh-100">
                    <Col md={2} className="bg-primary">
                        <NavAdmin />
                    </Col>
                    <Col md={10}>
                        <Container fluid className="mt-5">
                            <div>
                                <h1>Category List</h1>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {categories.map(category => (
                                        <tr key={category._id}>
                                            <td>{category.name}</td>
                                            <td>
                                                <button  className="ms-2 btn btn-success" onClick={() => handleEdit(category)}>Edit</button>
                                                <button className="ms-2 btn btn-danger" onClick={() => handleDelete(category._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Modal */}
                            <div id="editModal" className="modal">
                                <div className="modal-content" style={{width: "200px"}}>
                                    <span className="close" onClick={() => setEditedCategory(null)}>&times;</span>
                                    <input type="text" value={editedCategoryName}
                                           onChange={(e) => setEditedCategoryName(e.target.value)}/>
                                    <button className="btn btn-success" onClick={handleSave}>Save</button>
                                </div>
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

// @ts-ignore
export default CategoryAll;
