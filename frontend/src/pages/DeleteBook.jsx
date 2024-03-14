import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function DeleteBook() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleNo = () => {
    navigate("/");
  };

  const handleYes = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/books/${id}`);
      setLoading(false);
      navigate("..");
    } catch (error) {
      console.log("Error while deleting book: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {}, []);
  return (
    <div>
      {" "}
      <div>
        <div className="min-h-[100vh] bg-slate-900">
          <h1 className="text-4xl text-white text-center font-extrabold underline">
            <Link to="/">Book Store</Link>
          </h1>
          -
          {loading ? (
            <p className="text-white text-center">Loading...</p>
          ) : (
            <div className="flex flex-col">
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
              <div className="w-1/2 place-self-center">
                <p className="text-2xl text-white text-center font-extrabold m-4">
                  Are you sure you want to delete this book?
                </p>
                <div className="flex items-center justify-around gap-4">
                  <button
                    onClick={handleYes}
                    className="text-white text-3xl text-center font-semibold font-serif mx-4 my-6 px-4 py-1 border-4 rounded-md hover:shadow-2xl hover:cursor-pointer hover:bg-red-600 transform transition duration-1000"
                  >
                    Yes
                  </button>
                  <button
                    onClick={handleNo}
                    className="text-white text-3xl text-center font-semibold font-serif mx-4 my-6 px-4 py-1 border-4 rounded-md hover:shadow-2xl hover:cursor-pointer hover:bg-emerald-600 transform transition duration-1000"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeleteBook;
