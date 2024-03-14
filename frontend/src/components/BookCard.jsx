import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

function BookCard(props) {
  const { _id, title, author, genre, publishedYear } = props.book;
  return (
    <div className="h-[200px] min-w-[380px] bg-gray-800 rounded-md shadow-3xl px-4 py-4 shadow-2xl">
      <h2 className="text-white text-3xl font-semibold font-serif">{title}</h2>
      <span className="text-white text-xl font-bold font-serif">{author}</span>

      <div className="flex gap-1">
        <span className="text-white text-lg font-serif">Genre:</span>
        <p className="text-white text-lg font-serif">{genre}</p>
      </div>
      <div className="flex gap-1">
        <span className="text-white text-lg font-serif">Published Year:</span>
        <p className="text-white text-lg font-serif">{publishedYear}</p>
      </div>
      <div className="flex items-center justify-between gap-2 my-4 py-4">
        <Link to={`/books/${_id}/details`}>
          <BsInfoCircle className="text-2xl text-green-800" />
        </Link>
        <Link to={`/books/${_id}/update`}>
          <AiOutlineEdit className="text-2xl text-yellow-600" />
        </Link>
        <Link to={`/books/${_id}/delete`}>
          <MdOutlineDelete className="text-2xl text-red-600" />
        </Link>
      </div>
    </div>
  );
}

export default BookCard;
