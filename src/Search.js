/** 
 * @description used to search for new books to be added to user's library
 * @param {array} books - list of in user's current library 
 * @param {function} onUpdateBookShelf - called to update a book's shelf
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './booklisting/Book';
import { search } from './BooksAPI';
import Prompt from './Prompt';

class Search extends Component {
   state = {
      searchResults: [],
      isLoading: false,
      nothingFound: false,
      typingTimeout: 0,
   }

   handleChange = (e) => {
      const query = e.target.value;

      this.setState({
         query,
         isLoading: true,
         searchResults: []
      });
      
      const { typingTimeout } = this.state;

      if (typingTimeout) clearTimeout(typingTimeout);
      if (query==='' || query.trim()==='') {
         this.setState({
            isLoading: false,
            nothingFound: false,
         })
         return;
      }
      
      this.setState({
         typingTimeout: setTimeout(this.searchBooks, 1000)
      })
   }

   searchBooks = () => {
      search(this.state.query)
         .then(res => {
            if (res.error) this.setState({
               searchResults: [],
               isLoading: false,
               nothingFound: true
            })
            else this.setState({
               searchResults: res,
               isLoading: false,
               nothingFound: false
            })
         })
   }

   render() {
      const { isLoading, searchResults, nothingFound } = this.state;
      const { books } = this.props;

      const shelvedBooks = searchResults.map(bookFromSearch => {
         const found = books.filter(bookFromLibrary => (
            bookFromLibrary.id === bookFromSearch.id
         ))[0]

         if (found) return {...bookFromSearch, shelf: found.shelf};
         else return {...bookFromSearch, shelf: 'none'}
      })

      return <div className="search-books">
         <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
               <input 
                  type="text"
                  autoFocus
                  placeholder="Search by title or author"
                  onChange={this.handleChange}
               />
            </div>
         </div>
         <div className="search-books-results">
            <ol className="books-grid">
               {
                  isLoading 
                  ? <Prompt message="searching..."/>
                  : nothingFound
                  ? <Prompt message="nothing found"/>
                  :  shelvedBooks.map(book => (
                        <Book
                           key={book.id}
                           book={book}
                           onUpdateBookShelf={this.props.onUpdateBookShelf}
                        />
                     ))
               }
            </ol>
         </div>
      </div>
   }
}



Search.propTypes = {
   books: PropTypes.array.isRequired,
   onUpdateBookShelf: PropTypes.func.isRequired
}


export default Search ;