import React, {useEffect, useState} from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import { Link } from "react-router-dom";

const NavAdmin = () => {


    return (<>
        <Navbar className="flex-column vh-100 ">
            <Navbar.Brand className="text-white mb-4 mt-2">Admin Panel</Navbar.Brand>
            <Nav className="flex-column">
                <Nav.Link className="text-white  mt-1" href="/admin/users">Tài khoản</Nav.Link>
                <Nav.Link className="text-white  mt-1" href="/admin/product">Sản phẩm</Nav.Link>
                <Nav.Link className="text-white  mt-1" href="/admin/product/add">Thêm sản phẩm</Nav.Link>

                <Nav.Link className="text-white  mt-1" href="/admin/category">Loại</Nav.Link>

                <Nav.Link className="text-white  mt-1" href="/admin/Category/add">Thêm Loại</Nav.Link>
                <Nav.Link className="text-white  mt-1" href="/admin/cart">Đơn đặc hàng</Nav.Link>

            </Nav>
        </Navbar>
    </>);
}

export default NavAdmin;