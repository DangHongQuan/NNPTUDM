import React, { useState } from 'react';
import {MDBBtn, MDBContainer, MDBIcon} from "mdb-react-ui-kit";
import Header from "../component/Header";

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/v1/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            // Thực hiện các hành động tiếp theo sau khi đăng ký thành công
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        // <form onSubmit={handleSubmit}>
        //     <div>
        //         <label>
        //             Username:
        //             <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        //         </label>
        //     </div>
        //     <div>
        //         <label>
        //             Email:
        //             <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        //         </label>
        //     </div>
        //     <div>
        //         <label>
        //             Password:
        //             <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        //         </label>
        //     </div>
        //     <button type="submit">Register</button>
        // </form>
        <MDBContainer fluid style={{ height: "800px" ,
            background: "#6111cb", /* Màu nền mặc định */
            backgroundImage: "linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))" /* Đoạn gradient CSS */
        }}
        >
            <Header/>
            <div className='d-flex justify-content-center align-items-center h-100'>
                <div className='col-12'>

                    <div className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <form onSubmit={handleSubmit}
                              className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                            <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                            <p className="text-white-50 mb-5 ">Please enter your login and password!</p>
                            <label className="form-label">
                                <label className="text-white">Name:</label>
                                <input className="form-control pe-5" type="text" name="username" value={formData.username} onChange={handleChange} required />
                            </label>
                            <label className="form-label">
                                <label className="text-white">Email:</label>
                                <input className="form-control pe-5" type="email" name="email" value={formData.email} onChange={handleChange} required/>
                            </label>
                            <label className="form-label">
                                <label className="text-white">Password:</label>
                                <input className="form-control pe-5" type="password" name="password"
                                       value={formData.password} onChange={handleChange} required/>
                            </label>

                            <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot
                                password?</a></p>
                            <button className='btn btn-primary ps-5 pe-5'>
                                Register
                            </button>

                            <div className='d-flex flex-row mt-3 mb-5'>
                                <MDBBtn tag='a' color='none' className='m-3' style={{color: 'white'}}>
                                    <MDBIcon fab icon='facebook-f' size="lg"/>
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-3' style={{color: 'white'}}>
                                    <MDBIcon fab icon='twitter' size="lg"/>
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-3' style={{color: 'white'}}>
                                    <MDBIcon fab icon='google' size="lg"/>
                                </MDBBtn>
                            </div>

                            <div>
                                <p className="mb-0">Don't have an account? <a href="/Login"
                                                                              className="text-white-50 fw-bold">Login
                                    </a></p>

                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </MDBContainer>
    );
};

export default RegisterForm;
