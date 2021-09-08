/** 
 * @description displays all book shelves
 * @param {array} books - list of books to be displayed on bookshelfs
 * @param {bool} loadingBooks - loading indicator
 * @param {function} onUpdateBookShelf - called to move a book between shelves
*/


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';


class BookListing extends Component {
   render() {
      const { books, loadingBooks, onUpdateBookShelf } = this.props;
      const currentlyReading = books.filter(book => (book.shelf === 'currentlyReading'));
      const wantToRead = books.filter(book => (book.shelf === 'wantToRead'));
      const read = books.filter(book => (book.shelf === 'read'));

      return <div className="list-books">
         <div className="list-books-title">
            <h1>MyReads</h1>
         </div>
         {
            loadingBooks ? (
            <div className="loader">
               <p className="loader-message">Loading books...</p>
            </div>
            ) : (
               <div className="list-books-content">
                  <BookShelf 
                     title="currently reading" 
                     books={currentlyReading}
                     onUpdateBookShelf={onUpdateBookShelf}
                  />
                  <BookShelf 
                     title="want to read" 
                     books={wantToRead}
                     onUpdateBookShelf={onUpdateBookShelf}
                  />
                  <BookShelf 
                     title="read" 
                     books={read}
                     onUpdateBookShelf={onUpdateBookShelf}
                  />
               </div>
            )
         }
      </div>
   }
}


BookListing.propTypes = {
   books: PropTypes.array.isRequired,
   loadingBooks: PropTypes.bool.isRequired,
   onUpdateBookShelf: PropTypes.func.isRequired
}


export default BookListing;