import mongoose from "mongoose";
import config from "./config";

const mongodbUrl = config.MONGODB_URL;
const connectDB = async () => {
    try {
        console.log(`mongodbUrl: ${mongodbUrl}`);

        const conn = await mongoose.connect(mongodbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
