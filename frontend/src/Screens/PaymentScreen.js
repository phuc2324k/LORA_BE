import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { savePayment } from "../actions/cartAction";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen() {
    const [paymentMethod, setPaymentMethod] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Khởi tạo useNavigate

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment(paymentMethod));
        navigate("/placeorder"); // Thay props.history.push bằng navigate
    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>Payment</h2>
                        </li>
                        <li>
                            <input
                                type="radio"
                                name="paymentMethod"
                                id="paymentMethod"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                value="paypal"
                            />
                            <label htmlFor="paymentMethod">Paypal</label>
                        </li>
                        <li>
                            <button type="submit" className="button primary">
                                Continue
                            </button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    );
}

export default PaymentScreen;
