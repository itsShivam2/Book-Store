import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate, Link } from "react-router-dom";
function UpdateBook() {
  const [title, seTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        console.log(response.data.book);
        const { title, author, genre, publishedYear } = response.data.book;
        seTitle(title);
        setAuthor(author);
        setGenre(genre);
        setPublishedYear(publishedYear);
        setLoading(false);
      })
      .catch((error) => {
        console.log(("Error while fetching book details: ", error));
        setLoading(false);
      });
  }, [id]);

  const updateBook = async () => {
    const book = { title, author, genre, publishedYear };
    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/books/${id}`, book);
      console.log("Book updated successfully:");
      navigate("..");
      setLoading(false);
    } catch (error) {
      console.log("Error while adding the book: ", error);
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="min-h-[100vh] bg-slate-900 flex flex-col items-center">
        <h1 className="text-4xl text-white text-center font-extrabold underline m-4">
          <Link to="/">Book Store</Link>
        </h1>
        <h2 className="text-white text-3xl text-center font-semibold font-serif mt-8 mb-4">
          Update Book
        </h2>
        <form className="w-full lg:w-1/2 flex flex-col justify-center items-center m-8 p-8 border-8 border-x-gray-500">
          <div className="flex flex-col sm:flex-row sm:min-w-[480px]">
            <label
              htmlFor="title"
              className="sm:min-w-[240px] text-white text-lg text-center font-semibold font-serif sm:m-4 sm:p-2"
            >
              Title
            </label>
            <input
              value={title}
              onChange={(e) => seTitle(e.target.value)}
              type="text"
              name="title"
              id="title"
              className="sm:min-w-[240px] m-4 px-2 py-1 border-sky-600 border-4"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:min-w-[480px]">
            <label
              htmlFor="author"
              className="sm:min-w-[240px] text-white text-lg text-center font-semibold font-serif sm:m-4 sm:p-2"
            >
              Author
            </label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
              name="author"
              id="author"
              className="sm:min-w-[240px] m-4 px-2 py-1 border-sky-600 border-4"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:min-w-[480px]">
            <label
              htmlFor="genre"
              className="sm:min-w-[240px] text-white text-lg text-center font-semibold font-serif sm:m-4 sm:p-2"
            >
              Genre
            </label>
            <input
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              type="text"
              name="genre"
              id="genre"
              className="sm:min-w-[240px] m-4 px-2 py-1 border-sky-600 border-4"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:min-w-[480px]">
            <label
              htmlFor="publishedYear"
              className="sm:min-w-[240px] text-white text-lg text-center font-semibold font-serif sm:m-4 sm:p-2"
            >
              Published Year
            </label>
            <input
              value={publishedYear}
              onChange={(e) => setPublishedYear(e.target.value)}
              type="number"
              name="publishedYear"
              id="publishedYear"
              className="sm:min-w-[240px] m-4 px-2 py-1 border-sky-600 border-4"
            />
          </div>
          <button
            onClick={updateBook}
            className="text-white text-3xl text-center font-semibold font-serif mx-4 my-6 px-4 py-1 border-4 rounded-md hover:shadow-2xl hover:cursor-pointer hover:bg-emerald-600 transform transition duration-1000"
          >
            Submit
          </button>

          {loading && <Spinner />}
        </form>
      </div>
    </div>
  );
}

export default UpdateBook;
