import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

import { MdOutlineAddBox } from "react-icons/md";
import BookCard from "../components/BookCard";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/books")
      .then((res) => {
        setBooks(res.data.books);
        console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error while fetching data from backend: ", error);
      });
  }, []);

  return (
    <div>
      <div className="min-h-[100vh] bg-slate-900">
        <h1 className="text-4xl text-white text-center font-extrabold underline">
          Book Store
        </h1>
        <div className="p-8">
          <h2 className="text-2xl text-white text-center font-extrabold underline m-4">
            All Books
          </h2>

          <div className="flex items-center justify-center">
            <Link to="/books/create">
              <MdOutlineAddBox className="text-white text-xl text-center" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-x-4 gap-y-8 items-center justify-center">
            {loading ? (
              <Spinner />
            ) : (
              books.map((book) => {
                return <BookCard book={book} key={book._id} />;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
