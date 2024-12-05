import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import các hook mới
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../actions/userAction";

function SigninScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const dispatch = useDispatch();
    const location = useLocation(); // Hook lấy location
    const navigate = useNavigate(); // Hook lấy navigate
    
    // Lấy giá trị 'redirect' từ URL nếu có, mặc định là '/'
    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        window.scrollTo(0, 0);
        if (userInfo) {
            navigate(redirect); // Dùng navigate thay vì props.history.push
        }
    }, [userInfo, navigate, redirect]);

    const submitHandler = e => {
        e.preventDefault();
        dispatch(signin(email, password));
    };

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Sign-In</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={e => setEmail(e.target.value)}
                        ></input>
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                        ></input>
                    </li>
                    <li>
                        <button type="submit" className="button primary">
                            Signin
                        </button>
                    </li>
                    <li>New to Origami?</li>
                    <li>
                        <Link
                            to={redirect === "/" ? "/register" : "/register?redirect=" + redirect}
                            className="button secondary text-center"
                        >
                            Create your Origami account.
                        </Link>
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default SigninScreen;
