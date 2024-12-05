import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import {
    productListReducer,
    productDetailsReducer,
    productSaveReducer,
    productDeleteReducer
} from "./reducers/productReducers";
import { userSigninReducer, userRegisterReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducers";
// import thunk from "redux-thunk";
import { thunk } from 'redux-thunk';  // Đúng cú pháp
// import * as Cookie from "js-cookie";
import Cookies from 'js-cookie'; 

// const cartItems = Cookies.getJSON("cartItems") || [];
// const userInfo = Cookies.getJSON("userInfo") || null;

// Lấy dữ liệu từ cookie và phân tích JSON nếu cần
const cartItems = JSON.parse(Cookies.get("cartItems") || "[]"); // Nếu không có cartItems, trả về mảng rỗng
const userInfo = JSON.parse(Cookies.get("userInfo") || "null"); // Nếu không có userInfo, trả về null


const initialState = { cart: { cartItems, shipping:{}, payment:{} }, userSignin: { userInfo } };
const reducer = combineReducers({
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
);
export default store;
