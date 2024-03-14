import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
function ShowBook() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        console.log(response);
        setBook(response.data.book);

        setLoading(false);
      })
      .catch((error) => {
        console.log("Error", error);
        setLoading(false);
      });
  }, [id]);
  return (
    <div>
      <div className="min-h-[100vh] bg-slate-900">
        <h1 className="text-4xl text-white text-center font-extrabold underline">
          <Link to="/">Book Store</Link>
        </h1>
        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : (
          <div>
            <h2 className="text-2xl text-white text-center font-extrabold underline m-4">
              Book Details
            </h2>
            <div className="flex flex-col gap-4 items-center justify-center">
              <h2 className="text-white text-3xl font-semibold font-serif">
                {book.title}
              </h2>
              <span className="text-white text-xl font-bold font-serif">
                Author: {book.author}
              </span>
              <p className="text-white text-lg font-serif">
                Genre: {book.genre}
              </p>
              <p className="text-white text-lg font-serif">
                Published Year: {book.publishedYear}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowBook;
