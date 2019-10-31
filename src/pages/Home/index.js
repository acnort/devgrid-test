import React, { Component } from "react";
import { debounce } from "lodash";
import api from "./../../api";
import "./style.sass";

// Components
import { Book } from "../../components";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

class Home extends Component {
  state = {
    isLoading: false,
    books: []
  };

  componentDidMount() {
    const hasSavedBooks = localStorage.getItem("books");

    // sends get request to obtain a book list
    if (!hasSavedBooks) this.fetchBooks();
    else this.setState({ books: JSON.parse(hasSavedBooks) });
  }

  inputChanged = async (target, index) => {
    let currentMonth = new Date().getMonth();
    currentMonth = await months.filter(
      (month, index) => currentMonth === index
    )[0];

    await this.setState(prevState => ({
      books: prevState.books.map((el, i) =>
        i === index
          ? {
              ...el,
              month: target.checked ? currentMonth : null,
              read: target.checked,
              isSaving: true
            }
          : el
      )
    }));

    //debounce
    this.saveBooks();
  };

  saveBooks = debounce(async () => {
    this.setState(prevState => ({
      books: prevState.books.map(el => ({
        ...el,
        isSaving: false
      }))
    }));

    await localStorage.setItem("books", JSON.stringify(this.state.books));
  }, 1000);

  fetchBooks = async () => {
    this.setState({ isLoading: true });

    const { data } = await api.get(
      "people/altcaledor/lists/OL137448L/seeds.json"
    );

    await data.entries.map(book => {
      return (book.read = false);
    });

    await this.setState({ books: data.entries, isLoading: false });

    localStorage.setItem("books", JSON.stringify(this.state.books));
  };

  renderBooks = () => {
    const { books } = this.state;

    const props = {
      months,
      inputChanged: this.inputChanged
    };
    console.warn(books);
    const bookList = books.map((book, index) => {
      return <Book key={index} index={index} book={book} {...props} />;
    });

    return bookList;
  };

  generateReport = () => {
    this.props.history.push("/report", {
      books: this.state.books
    });
  };

  reloadList = () => {
    localStorage.clear();
    this.fetchBooks();
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div className="container">
        <div className="box">
          <h1>My Books</h1>
          {isLoading ? (
            <div className="loading">Loading Books...</div>
          ) : (
            <>
              <h4>Mark the books you've read below:</h4>
              <div className="list">{this.renderBooks()}</div>
              <button
                className="common-button"
                type="submit"
                onClick={this.generateReport}
              >
                Generate Annual Report
              </button>
              <button
                className="common-button default-button"
                type="submit"
                onClick={this.reloadList}
              >
                Clear and Reload List
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
