import React, { Component } from 'react';
import { debounce } from 'lodash';
import api from './../../api';
import './style.sass';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class Home extends Component{
    state = {
        isLoading: false,
        books: []
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
        let currentMonth = new Date().getMonth();
        currentMonth = await months.filter((month, index) => currentMonth === index)[0];

        await this.setState(prevState => ({
            books: prevState.books.map((el, i) => (
                i === index ? {
                    ...el,
                    month: target.checked ? currentMonth : null,
                    read: target.checked,
                    isSaving: true
                } : el
            ))
        }));

        //debounce
        this.saveBooks();
    }

    saveBooks = debounce(async () => {
        await localStorage.setItem('books', JSON.stringify(this.state.books));

        this.setState(prevState => ({
            books: prevState.books.map(el => (
                {
                    ...el,
                    isSaving: false
                }
            ))
        }));
    }, 1000);

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
                        <div className="loading">Loading Books...</div>
                    :
                        <>
                        <h4>Mark the books you've read below:</h4>
                        <div className="list">
                            {books.map((book, index) => (
                                <div key={index} className="checkbox-item">
                                    <input type="checkbox" name="read" id={`book-${index}`} defaultChecked={book.read} onChange={(ev) => this.inputChanged(ev.target, index)}/>
                                    <label htmlFor={`book-${index}`} className="book">
                                        <span className="checkmark"></span>
                                        <span className="text">{book.name}</span>
                                        {book.month &&
                                            <span className="is-read">
                                                {!book.isSaving ? `- Read on ${book.month}` : 'Saving...'}
                                            </span>
                                        }
                                    </label>
                                </div>
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