/** 
 * @description displays book information
 * @param {string} book
 * @param {function} onUpdateBookShelf - function to move book between shelves
 * 
*/


import React from 'react';
import PropTypes from 'prop-types';


const Book = ({ 
   book,
   shelf,
   onUpdateBookShelf 
}) => {
   const handleChange = e => onUpdateBookShelf(book, e.target.value);   
   
   return <li>
      <div className="book">
         <div className="book-top">
            <div 
               className="book-cover" 
               style={{ 
                  width: 128, 
                  height: 193, 
                  backgroundImage: `url("${book.imageLinks && book.imageLinks.smallThumbnail}")` 
               }}
            ></div>
            <div className="book-shelf-changer">
               <select value={book.shelf} onChange={handleChange}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
               </select>
            </div>
         </div>
         <div className="book-title">{book.title}</div>
         {
            book.authors && <div className="book-authors">{book.authors.join(' & ')}</div>
         }
      </div>
   </li>
}


Book.propTypes = {
   book: PropTypes.object.isRequired,
   onUpdateBookShelf: PropTypes.func.isRequired
}


export default Book;