/** 
 * @description displays all books in a bookshelf
 * @param {array} books - list of books 
 * @param {string} title - bookshelf title
 * @param {function} onUpdateBookShelf - called to update a book's shelf
*/


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';


class BookShelf extends Component {
   render() {
      const { title, books, onUpdateBookShelf } = this.props;

      return (
         <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
               {
                  books.length > 0 ? (
                     <ol className="books-grid">
                        {
                           books.map(({id, title, imageLinks: {smallThumbnail}, authors, shelf}) => (
                              <Book
                                 key={id}
                                 id={id}
                                 title={title}
                                 thumbnailUrl={smallThumbnail}
                                 authors={authors}
                                 shelf={shelf}
                                 onUpdateBookShelf={onUpdateBookShelf}
                              />
                           ))
                        }
                     </ol>
                  ) : (
                     <p>There are no books on this shelf</p>
                  )
               }
            </div>
         </div>
      )
   }
}


BookShelf.propTypes = {
   books: PropTypes.array.isRequired,
   title: PropTypes.string.isRequired,
   onUpdateBookShelf: PropTypes.func.isRequired
}


export default BookShelf;