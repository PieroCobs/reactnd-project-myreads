import React, { Component, Fragment } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookListing from './booklisting/BookListing'


class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
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

  handleBookShelfUpdate = (bookId, shelf) => {
    const { books } = this.state;
    const bookToUpdate = books.filter(book => (book.id === bookId))[0];
    const allOtherBooks = books.filter(book => book.id !== bookId);

    bookToUpdate.shelf = shelf;
    this.setState({
      books: [...allOtherBooks, bookToUpdate]
    })

    BooksAPI.update(bookToUpdate, shelf)
  }

  render() {
    const {books, loadingBooks} = this.state;

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <Fragment>
            <BookListing 
              books={books} 
              loadingBooks={loadingBooks}
              onUpdateBookShelf={this.handleBookShelfUpdate}
            />
            <div className="open-search">
              <button 
                onClick={() => this.setState({ showSearchPage: true })}
              >Add a book</button>
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

export default BooksApp
