import React, { Component, Fragment } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookListing from './booklisting/BookListing'
import { Route, Link } from 'react-router-dom'
import Search from './Search'


class BooksApp extends Component {
  state = {
    books: [],
    loadingBooks: true // used to show loading message prior to fetching books from API
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => this.setState({ 
        books,
        loadingBooks: false 
      }))
  }

  handleBookShelfUpdate = (book, shelf) => {
    const { books } = this.state;
    const allOtherBooks = books.filter(b => b.id !== book.id);
    const bookToUpdate = {...book, shelf: shelf};

    this.setState({
      books: [...allOtherBooks, bookToUpdate]
    })

    BooksAPI.update(bookToUpdate, shelf)
  }

  render() {
    const {books, loadingBooks} = this.state;

    return (
      <div className="app">
        <Route
          path="/"
          exact
          render={() => (
            <Fragment>
              <BookListing 
                books={books} 
                loadingBooks={loadingBooks}
                onUpdateBookShelf={this.handleBookShelfUpdate}
              />
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </Fragment>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <Search 
              books={books}
              onUpdateBookShelf={this.handleBookShelfUpdate}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
