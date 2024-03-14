import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Connection to the DB is successful");
    })
    .catch((error) => {
      console.log("Error while connecting to the DB: ", error);
    });
}

export default connectDB;
  
