import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import {message} from "antd";

interface Product {
    id: string;
    _id: string;
    name: string;
    price: number;
    describe: string;
    imageUrl: string;
}

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [formData, setFormData] = useState({
        idUser: "",
        name: "",
        address: "",
        phone: "",
        price: 0,
    });
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        const cartItemsString = localStorage.getItem("cartItems");
        if (cartItemsString) {
            const cartItems = JSON.parse(cartItemsString);
            const totalPrice = cartItems.reduce((total: number, item: Product) => total + item.price, 0);
            setTotalPrice(totalPrice);
        }
    }, []);

    useEffect(() => {
        const cartItemString = localStorage.getItem("cartItems");
        if (cartItemString) {
            try {
                const parsedCartItems: Product[] = JSON.parse(cartItemString);
                setCartItems(parsedCartItems);
            } catch (error) {
                console.error("Error parsing cart items:", error);
            }
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const { userId } = JSON.parse(atob(token.split(".")[1]));
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    idUser: userId,
                }));
            } catch (error) {
                console.error("Error parsing token:", error);
            }
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const cartItemsString = localStorage.getItem("cartItems");
            if (!cartItemsString) {
                console.error("No items in cart");
                return;
            }
            const cartItems = JSON.parse(cartItemsString);
            const nameProduct = cartItems.map((item: Product) => item.name).join(", ");
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }
            const { userId } = JSON.parse(atob(token.split(".")[1]));

            const formDataToSend = {
                idUser: userId,
                name: formData.name,
                nameProduct: nameProduct,
                totalPrice: totalPrice,
                address: formData.address,
                phone: formData.phone,
            };
            console.log("Data to send:", formDataToSend);

            const response = await fetch("http://localhost:3000/api/v1/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataToSend),
            });

            if (response.ok) {
                console.log("Items added to cart successfully");
                localStorage.removeItem("cartItems");
                setCartItems([]);
                setFormData({
                    idUser: "",
                    name: "",
                    address: "",
                    phone: "",
                    price: 0,
                });
                setTotalPrice(0)
                message.success('Payment successful!');
            } else {
                console.error("Failed to add items to cart");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <>
            <Header/>
            <h1 className="container " style={{marginTop: "200px"}}>Giỏ hàng</h1>

            <div className="container mt-5" >
                <div className="row">
                    <div className="col-md-6 col-12">
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item._id}>
                                    <p>{item.name + " " + item.price.toLocaleString('vi-VN') + " VNĐ"}</p>

                                </li>
                            ))}
                            <h5 > Tổng thanh toán: {totalPrice.toLocaleString('vi-VN')} VNĐ</h5>

                        </ul>


                    </div>
                    <div className="col-md-6 col-12">


                        <form className="form-group" onSubmit={handleSubmit}>
                            <label className="form-label">Tên của bạn</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <label className="form-label">Gmail</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                            <label className="form-label">Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            <button className="btn btn-success mt-3" type="submit">Checkout</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
};

export default CartPage;
