import React, { Component } from "react";
import "./style.sass";

class Book extends Component {
  state = {
    isLoading: false
  };

  render() {
    const { book, index, inputChanged } = this.props;

    return (
      <div key={index} className="checkbox-item">
        <input
          type="checkbox"
          name="read"
          id={`book-${index}`}
          defaultChecked={book.read}
          onChange={ev => inputChanged(ev.target, index)}
        />
        <label htmlFor={`book-${index}`} className="book">
          <span className="checkmark" />
          <span className="text">{book.title}</span>
          {book.month && (
            <span className="is-read">
              {!book.isSaving ? `- Read on ${book.month}` : "Saving..."}
            </span>
          )}
        </label>
      </div>
    );
  }
}

export default Book;
