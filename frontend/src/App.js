import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import NumberList from "./screens/NumberList";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

import logo from "./Images/logo.png";

function App() {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const openmenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    };
    const closemenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    };
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="header">
                    <div className="brand">
                        <button onClick={openmenu}>&#9776;</button>
                        <Link to="/">
                            Origami
                            <img src={logo} className="logo" />
                        </Link>
                    </div>
                    <div className="header-links">
                        <span>
                            <Link to="/cart">
                                <span className="material-icons">
                                    shopping_cart
                                </span>
                            </Link>
                        </span>
                        <span>
                            {userInfo ? (
                                <Link to="/profile">{userInfo.name}</Link>
                            ) : (
                                <Link to="/signin">
                                    <span className="material-icons">login</span>
                                </Link>
                            )}
                        </span>
                    </div>
                </header>
                <aside className="sidebar">
                    <h3>Categories</h3>
                    <button
                        className="sidebar-close-button"
                        onClick={closemenu}
                    >
                        <span className="material-icons">arrow_back_ios</span>
                    </button>
                    <ul>
                        <li>
                            <a href="index.html">Mens</a>
                        </li>
                        <li>
                            <a href="index.html">Women</a>
                        </li>
                        <li>
                            <a href="index.html">Unisex</a>
                        </li>
                        <li>
                            <a href="index.html">Children</a>
                        </li>
                    </ul>
                </aside>
                <main className="main">
                    <div className="content">
                        <Routes>
                            <Route path="/products" element={<ProductsScreen />} />
                            <Route path="/shipping" element={<ShippingScreen />} />
                            <Route path="/payment" element={<PaymentScreen />} />
                            <Route path="/placeorder" element={<PlaceOrderScreen />} />
                            <Route path="/signin" element={<SigninScreen />} />
                            <Route path="/register" element={<RegisterScreen />} />
                            <Route path="/product/:id" element={<ProductScreen />} />
                            <Route path="/cart/:id?" element={<CartScreen />} />
                            <Route path="/test" element={<NumberList />} />
                            <Route path="/" element={<HomeScreen />} />
                        </Routes>
                    </div>
                </main>
                <footer className="footer">All right reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
