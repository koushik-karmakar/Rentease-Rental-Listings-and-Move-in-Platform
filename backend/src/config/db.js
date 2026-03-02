import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const MONGO_DB_URI = process.env.MONGO_DB_URI;
const db_uri = `${MONGO_DB_URI}/${MONGO_DB_NAME}`;
const mongoDbConnect = async () => {
  try {
    const connection = await mongoose.connect(db_uri);
    console.log(`Connected to MongoDB ${connection.connection.host}`);
  } catch (error) {
    console.log(`Database connection failed!: ${error}`);
    process.exit(1);
  }
};
export default mongoDbConnect;
