
import React, { useEffect, useState } from 'react';

import Header from "../component/Header";


const Contact: React.FC = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const response = await fetch('http://localhost:3000/api/v1/contact/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Message sent successfully');
                setFormData({
                    name: '',
                    email: '',
                    message: '',
                });
            } else {
                console.error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <>
            <Header/>

            <div className="container mt-5">
                <iframe className="container-fluid"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.427573115737!2d106.78279807583895!3d10.85504795773702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527c3debb5aad%3A0x5fb58956eb4194d0!2zxJDhuqFpIEjhu41jIEh1dGVjaCBLaHUgRQ!5e0!3m2!1sen!2s!4v1712746692890!5m2!1sen!2s"
                        width="500" height="450" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h2>Liên hệ với chúng tôi</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Your Name</label>
                                <input type="text" className="form-control" id="name" name="name" value={formData.name}
                                       onChange={handleChange} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Your Email</label>
                                <input type="email" className="form-control" id="email" name="email"
                                       value={formData.email} onChange={handleChange} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea className="form-control" id="message" name="message" rows={5}
                                          value={formData.message} onChange={handleChange} required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
