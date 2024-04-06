import React, { useEffect, useState } from 'react';
import image from '../root/assets/img/menu/menu-item-1.png';
interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    describe: String;
    isDeleted: {
        type: Boolean,
        default: false,
    };

}

function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Gửi yêu cầu GET đến endpoint /api/v1/product
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
                // Cập nhật danh sách sản phẩm khi nhận được dữ liệu từ backend
                setProducts(data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []); // useEffect sẽ chỉ được gọi một lần sau khi component được render lần đầu tiên

    return (
        <>
            {/* <h2>Product List</h2>

            {products.map(product => (
                // <li key={product.id}>
                //     {product.name}
                // </li>
                <img src={product.imageUrl} alt="" />

            ))} */}
            <header id="header" className="header fixed-top d-flex align-items-center">
                <div className="container d-flex align-items-center justify-content-between">

                    <a href="index.html" className="logo d-flex align-items-center me-auto me-lg-0">
                        <img src=" ./root/assets/img/logo.png" alt="" />
                        <h1>Yummy<span>.</span></h1>
                    </a>

                    <nav id="navbar" className="navbar">
                        <ul>
                            <li><a href="#hero">Home</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#menu">Menu</a></li>
                            <li><a href="#events">Events</a></li>
                            <li><a href="#chefs">Chefs</a></li>
                            <li><a href="#gallery">Gallery</a></li>
                            <li className="dropdown"><a href="#"><span>Drop Down</span> <i className="bi bi-chevron-down dropdown-indicator"></i></a>
                                <ul>
                                    <li><a href="#">Drop Down 1</a></li>
                                    <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-down dropdown-indicator"></i></a>
                                        <ul>
                                            <li><a href="#">Deep Drop Down 1</a></li>
                                            <li><a href="#">Deep Drop Down 2</a></li>
                                            <li><a href="#">Deep Drop Down 3</a></li>
                                            <li><a href="#">Deep Drop Down 4</a></li>
                                            <li><a href="#">Deep Drop Down 5</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Drop Down 2</a></li>
                                    <li><a href="#">Drop Down 3</a></li>
                                    <li><a href="#">Drop Down 4</a></li>
                                </ul>
                            </li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </nav>

                    <a className="btn-book-a-table" href="#book-a-table">Book a Table</a>
                    <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
                    <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>

                </div>
            </header>
            <section id="hero" className="hero d-flex align-items-center section-bg">
                <div className="container">
                    <div className="row justify-content-between gy-5">
                        <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
                            <h2 >Enjoy Your Healthy<br />Delicious Food</h2>
                            <p data-aos-delay="100">Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.</p>
                            <div className="d-flex" data-aos-delay="200">
                                <a href="#book-a-table" className="btn-book-a-table">Book a Table</a>
                                <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ" className="glightbox btn-watch-video d-flex align-items-center"><i className="bi bi-play-circle"></i><span>Watch Video</span></a>
                            </div>
                        </div>
                        <div className="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
                            <img src=" ./root/assets/img/hero-img.png" className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section id="menu" className="menu container">
                <div className=" row">
                    {products.map(product => (
                        <div className='col-lg-4 ' key={product.id}>
                            <h1>{product.name}</h1>
                            <p>{product.price}</p>
                            <p>{product.describe}</p>

                            <img style={{ width: '300px' }} src={product.imageUrl} alt={product.imageUrl} />
                        </div>
                    ))}


                </div>
            </section>
        </>
    );
}

export default ProductList;
