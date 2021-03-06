import React, { Component } from "react";
import "./style.sass";

import { BookDetail } from "../../components";

class Report extends Component {
  state = {
    readBooks: []
  };

  componentWillMount() {
    const books = JSON.parse(localStorage.getItem("books"));
    books || this.props.history.replace("/");

    this.setState({ readBooks: books.filter(book => book.read) });
  }

  renderBooks = () => {
    return this.state.readBooks.map((book, index) => (
      <BookDetail key={index} book={book} />
    ));
  };

  render() {
    const { readBooks } = this.state
    return (
      <div className="container">
        <div className="box">
          <h1>Annual Report</h1>
          {readBooks &&
            <h2>
              Books Read: <span>{readBooks.length}</span>
            </h2>
          }
          <div className="book-list">{this.renderBooks()}</div>
        </div>
      </div>
    );
  }
}

export default Report;
