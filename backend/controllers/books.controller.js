import { Book } from "../models/book.model.js";

const addBook = async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.genre ||
      !req.body.publishedYear
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
      genre: req.body.genre,
    };

    // newBook.save();

    const book = await Book.create(newBook);

    if (!book) {
      return res.status(500).json({
        success: false,
        message: "Error while adding the book",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Book saved successfully",
    });
  } catch (error) {
    console.log("Error while adding the book: ", error);
    res.status(500).json({
      success: false,
      message: "Error while adding the book",
    });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      success: true,
      message: "All books fetched successfully",
      books_count: books.length,
      books,
    });
  } catch (error) {
    console.log("Error while fetching the books: ", error);
    res.status(500).json({
      success: false,
      message: "Error while fetching the books",
    });
  }
};

const getBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    return res.status(200).json({
      success: true,
      message: "Book fetched successfully",
      book,
    });
  } catch (error) {
    console.log("Error while fetching the book: ", error);
    res.status(500).json({
      success: false,
      message: "Error while fetching the book",
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (
      !id ||
      !req.body.title ||
      !req.body.author ||
      !req.body.genre ||
      !req.body.publishedYear
    ) {
      return res.status(400).json({
        success: false,
        message: "Please send all the fields",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      updatedBook,
    });
  } catch (error) {
    console.log("Error while updating the book: ", error);
    res.status(500).json({
      success: false,
      message: "Error while updating the book",
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.log("Error while deleting the book: ", error);
    res.status(500).json({
      success: false,
      message: "Error while deleting the book",
    });
  }
};

export { addBook, getAllBooks, getBook, updateBook, deleteBook };
