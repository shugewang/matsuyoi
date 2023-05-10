import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type BookProps = {
  id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  createdAt: Date;
};

const Book: React.FC<{ book: BookProps }> = ({ book }) => {
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${book.id}`)}>
      <h2>{book.title}</h2>
      {/* <small>By {book.author}</small> */}
      <small>Added on {book.createdAt}</small>
      <ReactMarkdown children={book.description} />
      {/* <p>Genre: {book.genre}</p> */}
      <style jsx>{`
        div {
          color: inherit;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Book;
