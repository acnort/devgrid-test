import React, { Component } from 'react';
import api from './../../api'
import { debounce } from 'lodash'
import './style.sass';

class Home extends Component{
    state = {
        isLoading: false,
        books: [],
    }

    componentDidMount(){
        const hasSavedBooks = localStorage.getItem('books');

        // sends get request to obtain a book list
        if (!hasSavedBooks)
            this.loadBooks();
        else
            this.setState({books: JSON.parse(hasSavedBooks)});
    }

    inputChanged = async (target, index) => {
        let newBookData = this.state.books[index];
        newBookData.read = target.checked;

        let newBooksArray = this.state.books;
        newBooksArray[index] = newBookData;

        //debouncing for performance
        debounce(() => {
            this.setState({ books: newBooksArray});
            localStorage.setItem('books', JSON.stringify(newBooksArray));
        }, 1000)();
    }

    loadBooks = async () => {
        this.setState({isLoading: true});

        const { data } = await api.get('people/george08/lists.json');

        await data.entries.map(book => {
            return book.read = false
        });

        await this.setState({ books: data.entries, isLoading: false });

        localStorage.setItem('books', JSON.stringify(this.state.books));
    }

    render(){
        const { isLoading, books } = this.state
        return (
            <div className="container">
                <div className="box">
                    <h1>My Books</h1>
                    {isLoading ?
                        <>
                        <h4>Mark the books you've read below:</h4>
                        <div className="loading">Loading Books...</div>
                        </>
                    :
                        <>
                        <div className="list">
                            {books.map((book, index) => (
                                <label key={index} htmlFor={`book-${index}`} className="book">
                                    <input type="checkbox" name="read" id={`book-${index}`} defaultChecked={book.read} onChange={(ev) => this.inputChanged(ev.target, index)}/>
                                    <span className="checkmark"></span>
                                    <span className="text">{book.name}</span>
                                    <span className="is-read"> - Read</span>
                                </label>
                            ))}
                        </div>
                        <button className="common-button" type="submit" onClick={this.loadBooks}>Generate Annual Report</button>
                        </>
                    }
                </div>
            </div>
        )
    }
}

export default Home;