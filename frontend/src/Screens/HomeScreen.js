import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

import Carousel from "../components/Carousel";

function HomeScreen(props) {
    const productList = useSelector((state) => state.productList);
    const { products, loading, error } = productList;

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div>
            {/* Carousel Component */}
            <Carousel />

            {/* Loading/Error/Products */}
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : products.length === 0 ? ( // Kiểm tra nếu products rỗng
                <div className="no-products">No products found</div>
            ) : (
                <ul className="products">
                    {products.map((product) => (
                        <li key={product._id}>
                            <div className="product">
                                <Link to={`/product/${product._id}`}>
                                    <img
                                        className="product-image"
                                        src={product.image}
                                        alt={product.name} // Hiển thị tên sản phẩm làm alt
                                    />
                                </Link>
                                <Link to={`/product/${product._id}`}>
                                    <div className="product-name">{product.name}</div>
                                </Link>
                                <div className="product-brand">{product.brand}</div>
                                <div className="product-price">${product.price}</div>
                                <div className="product-rating">
                                    {/* {product.rating} Stars ({product.numReviews} Reviews) */}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default HomeScreen;
