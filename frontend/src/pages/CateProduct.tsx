import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";
import Header from "../component/Header";
interface Product {
    id: number;
    name: string;
    _id: string;

    price: number;
    imageUrl: string;
    describe: string;
    categoryId: string;
}

interface RouteParams {
    categoryId: string;
}
const ProductList: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [products, setProducts] = useState<Product[]>([]);


    useEffect(() => {
        // Gọi API để lấy danh sách tất cả các sản phẩm
        axios.get(`http://localhost:3000/api/v1/product`)
            .then(response => {
                // Lọc danh sách sản phẩm dựa trên categoryId
                const filteredProducts = response.data.filter((product: Product) => product.categoryId === categoryId);
                setProducts(filteredProducts);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, [categoryId]);

    return (
        <>


            <Header />

            <section id="menu" className="menu container">
                <div className=" row">
                    {products.map(product => (
                        <div className='col-lg-4 ' key={product.id}>


                            <Link to={`/product/${product._id}`}>
                                <img style={{width: '300px', height: "300px"}} src={product.imageUrl} alt={product.imageUrl}/>
                            </Link>
                        </div>
                    ))}


                </div>
            </section>
        </>
    );
};

export default ProductList;
