import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartAction";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

function CartScreen() {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const { id } = useParams();  // Thay match.params.id bằng useParams()
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const location = useLocation();  // Thay location.search bằng useLocation()
    const qty = location.search ? Number(location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const navigate = useNavigate();  // Thay history.push bằng useNavigate()

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id) {
            dispatch(addToCart(id, qty)); // Sử dụng id thay vì productId
        }
    }, [dispatch, id, qty]);  // Thêm qty và id vào dependency array

    const checkoutHandler = () => {
        if (!userInfo) {
            navigate(`/login?redirect=shipping`);  // Nếu chưa đăng nhập, chuyển đến /login và thêm redirect
        } else {
            navigate("/shipping");  // Nếu đã đăng nhập, chuyển đến /shipping
        }
    };

    return (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h1>Your Cart</h1>
                        <div>Price</div>
                    </li>
                    {cartItems.length === 0 ? (
                        <div>
                            <h1>Cart is Empty.</h1>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <li key={item.product}>
                                <div className="cart-image">
                                    <img src={item.image} alt="product" />
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={"/product/" + item.product}>
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div>
                                        Quantity :
                                        <select
                                            value={item.qty}
                                            onChange={(e) =>
                                                dispatch(
                                                    addToCart(item.product, e.target.value)
                                                )
                                            }
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() => removeFromCartHandler(item.product)}
                                            className="cart-button"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-price">${item.price}</div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <div className="cart-action">
                <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items): $
                    {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h3>
                <button
                    className="button primary full-width"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default CartScreen;
