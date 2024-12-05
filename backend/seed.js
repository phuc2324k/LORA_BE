import mongoose from "mongoose";
import Product from "./models/productModel.js";
import data from "./data.js";
import connectDB from "./db.js";



export const importData = async () => {
    try {
        // Kết nối MongoDB
        await connectDB();

        // Xóa tất cả dữ liệu hiện tại trong collection
        await Product.deleteMany();

        // Thêm dữ liệu từ data.js
        const products = await Product.insertMany(data.products);

        console.log("Data Imported Successfully!");
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};
