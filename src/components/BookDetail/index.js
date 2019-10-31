import React, { Component } from "react";
import "./style.sass";

import api from "./../../api";

class Book extends Component {
  state = {
    book: null
  };

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails = async () => {
    const { book } = this.props;

    const olId = book.url.split("/")[2];

    const { data } = await api.get(
      `api/books?bibkeys=OLID:${olId}&jscmd=details&format=json`
    );

    const { details } = data[`OLID:${olId}`];
    this.setState({ book: { ...book, details } });
  };

  renderAuthors = authors =>
    authors.map((author, key) =>
      key === 0 ? author.name : `, ${author.name}`
    );

  render() {
    const { book } = this.state;
    console.warn(book);
    return (
      <>
        {book && (
          <div className="book-detail">
            <div className="cover">
              <img
                src={
                  book.picture
                    ? `https:${book.picture.url}`
                    : "https://via.placeholder.com/150x200?text=No+Cover"
                }
                alt={book.title}
              />
            </div>
            <ul>
              <li>
                <strong>Title:</strong> {book.title}
              </li>
              {book.details.subtitle && (
                <li>
                  <strong>Subtitle:</strong> {book.details.subtitle}
                </li>
              )}
              {book.details.authors && (
                <li>
                  <strong>Authors:</strong>{" "}
                  {this.renderAuthors(book.details.authors)}
                </li>
              )}
              {book.details.publish_date && (
                <li>
                  <strong>Publish Date:</strong> {book.details.publish_date}
                </li>
              )}
              {book.details.number_of_pages && (
                <li>
                  <strong>N. of Pages:</strong> {book.details.number_of_pages}
                </li>
              )}
              <li>
                <strong>Read on:</strong> {book.month}
              </li>
            </ul>
          </div>
        )}
      </>
    );
  }
}

export default Book;
