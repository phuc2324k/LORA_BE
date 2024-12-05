import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import connectDB from "./db.js";
import { importData } from "./seed.js";  // Import data chỉ khi cần

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Kết nối với MongoDB
const startServer = async () => {
  try {
    await connectDB();  // Kết nối với MongoDB
    console.log("MongoDB connected successfully");

    // Chỉ gọi importData khi cần, nếu bạn chỉ muốn import dữ liệu một lần
    if (process.env.NODE_ENV === "development") {
      await importData();
    }

    // Khởi động server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error while starting server:", err);
  }
};

// Middleware để phân tích JSON
app.use(express.json()); // Express đã hỗ trợ phân tích JSON mà không cần body-parser

// Định nghĩa các route API
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

// Serve static assets khi ở môi trường production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Khởi động server
startServer();
