import React from "react";
import "./styles.css";
import axios from "axios";
import { useState } from "react";

export default function App() {
  const [booksearched, setBooksearched] = useState("");
  const [result, setResult] = useState([]);

  function setChange(event) {
    const book = event.target.value;
    setBooksearched(book);
  }

  function onSubmit(event) {
    event.preventDefault();
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=" + booksearched)
      .then(res => {
        setResult(res.data.items);
      });
  }
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <h1 style={{ color: "black" }}>GoogleAPI</h1>
        <form onSubmit={onSubmit} className="form-inline my-2 my-lg-0">
          <div className="form-group">
            <input
              type="text"
              onChange={setChange}
              className="form-control mr-sm-2"
              placeholder="Search"
              autoComplete="off"
            />
          </div>
          <button className="btn btn-secondary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </nav>

      {result.map(book => (
        <div className="card border-primary mb-3" style={{ width: "30rem" }}>
          <div className="card-header">
            <h3>{book.volumeInfo.title}</h3>
          </div>
          <a href={book.saleInfo.buyLink}>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
          </a>
          <p>{book.volumeInfo.description}</p>
        </div>
      ))}
    </div>
  );
}
