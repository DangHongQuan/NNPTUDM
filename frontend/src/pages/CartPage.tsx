import React, { useState, useEffect } from "react";

const CartPage: React.FC = () => {
    const [formData, setFormData] = useState({
        idUser: "",
        name: "",
        nameProduct: "",
        totalPrice: "",
        address: "",
        phone: "",
    });
    useEffect(() => {
        // Trích xuất dữ liệu từ Local Storage
        const cartItemString = localStorage.getItem("cartItems");
        if (cartItemString) {
            try {
                // Parse dữ liệu JSON từ chuỗi được trích xuất
                const cartItem = JSON.parse(cartItemString)[0]; // Assuming there is only one item
                // Sử dụng dữ liệu đã trích xuất để cập nhật giá trị của các trường trong state của form
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    nameProduct: cartItem.name,
                    totalPrice: cartItem.price.toString(),
                }));
            } catch (error) {
                console.error("Error parsing cart item:", error);
            }
        }
    }, []);
    useEffect(() => {
        // Trích xuất token từ Local Storage
        const token = localStorage.getItem("token");
        if (token) {
            try {
                // Giải mã token để lấy thông tin payload
                const { userId } = JSON.parse(atob(token.split(".")[1]));
                // Lấy userId từ payload và cập nhật giá trị idUser trong state của form
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
            const response = await fetch("http://localhost:3000/api/v1/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                console.log("Item added successfully");
                localStorage.removeItem("cartItems");

                // Reset form data after successful submission
                setFormData({
                    idUser: "",
                    name: "",
                    nameProduct: "",
                    totalPrice: "",
                    address: "",
                    phone: "",
                });
            } else {
                console.error("Failed to add item");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="idUser"
                placeholder="User ID"
                value={formData.idUser}
                onChange={handleChange}
            />
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                type="text"
                name="nameProduct"
                placeholder="Product Name"
                value={formData.nameProduct}
                onChange={handleChange}
            />
            <input
                type="text"
                name="totalPrice"
                placeholder="Total Price"
                value={formData.totalPrice}
                onChange={handleChange}
            />
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
            />
            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
            />
            <button type="submit">Add to Cart</button>
        </form>
    );
};

export default CartPage;
