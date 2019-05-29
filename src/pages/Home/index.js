import React, { Component } from 'react';
import api from './../../api'
import './style.sass';

class Home extends Component{
    state = {
        isLoading: false,
        books: [],
    }

    componentDidMount(){
        // sends get request to obtain a book list
        this.refreshBooks();
    }

    inputChanged = (target) => {
        console.log(localStorage);
        console.log(JSON.parse(localStorage.books));
    }

    refreshBooks = async () => {
        this.setState({isLoading: true});

        const { data } = await api.get('people/george08/lists.json');

        await data.entries.map(book => {
            return book.read = false
        });

        await this.setState({ books: data.entries, isLoading: false });

        localStorage.setItem('books', JSON.stringify(this.state.books))
    }

    render(){
        const { isLoading, books } = this.state
        return (
            <div className="container">
                <div className="box">
                    <h1>My Books</h1>
                    {isLoading &&
                        <div className="loading">Loading Books...</div>
                    }
                    <div className="list">
                        {!isLoading
                            && books.map((book, index) => (
                                <label key={index} htmlFor={`book-${index}`} className="book">
                                    <input type="checkbox" name="read" id={`book-${index}`} onChange={(ev) => this.inputChanged(ev.target)}/>
                                    <span className="checkmark"></span>
                                    <span className="text">{book.name}</span>
                                </label>
                            ))
                        }
                    </div>
                    {!isLoading &&
                        <button className="common-button" type="submit" onClick={this.refreshBooks}>Refresh Books</button>
                    }
                </div>
            </div>
        )
    }
}

export default Home;