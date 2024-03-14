import express from "express";
import dotenv from "dotenv";
import bookRouter from "./routes/books.routes.js";
import connectDB from "./config/connectDB.js";
import cors from "cors";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

//There are 2 ways to use cors
//1. Allow all origins
// app.use(cors());
//2. All sepcific origins
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use("/", bookRouter);

app.get("/", (req, res) => {
  res.send("<h1>Book Store</h1>");
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
