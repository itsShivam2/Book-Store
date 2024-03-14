import { Router } from "express";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/books.controller.js";
const router = Router();

router.post("/add-book", addBook);

router.get("/books", getAllBooks);

router.get("/books/:id", getBook);

router.put("/books/:id", updateBook);

router.delete("/books/:id", deleteBook)

export default router;
