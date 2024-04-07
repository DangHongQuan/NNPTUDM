import React, { useEffect, useState } from 'react';
import image from '../root/assets/img/menu/menu-item-1.png';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
interface Product {
    id: number;
    _id: String;

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
    const [userRole, setUserRole] = useState('');

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



    useEffect(() => {
        // Lấy thông tin về vai trò của người dùng từ token JWT
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken: any = parseJwt(token);
            setUserRole(decodedToken.role);
        }
    }, []);

    return (
        <>


            <Header />
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

                            <Link to={`/product/${product._id}`}>
                                <img style={{ width: '300px' }} src={product.imageUrl} alt={product.imageUrl} />
                            </Link>
                        </div>
                    ))}


                </div>
            </section>
        </>
    );
}
function parseJwt(token: string) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}
export default ProductList;
