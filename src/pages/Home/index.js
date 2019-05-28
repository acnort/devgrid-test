import React, { Component } from 'react';
import api from './../../api'
import './style.sass';

class Home extends Component{
    state = {
        isLoading: false,
        books: [],
    }

    componentDidMount(){
        this.getBooks()
    }

    async getBooks (){
        this.setState({isLoading: true});

        const { data } = await api.get('people/george08/lists.json');

        this.setState({ books: data.entries, isLoading: false });
    }

    render(){
        const { isLoading, books } = this.state
        return (
            <div className="container">
                <h1>My Books</h1>
                <div className={`list ${isLoading ? 'loading' : null}`}>
                    {!isLoading && books.map(book => (
                        <div>{book.name}</div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Home;