/** 
 * @description displays book information
 * @param {string} id
 * @param {string} title
 * @param {string} thumbnailUrl
 * @param {array} authors
 * @param {string} shelf
 * @param {function} onUpdateBookShelf - function to move book between shelves
 * 
*/


import React from 'react';
import PropTypes from 'prop-types';


const Book = ({ id, title, thumbnailUrl, authors, shelf, onUpdateBookShelf }) => {
   const handleChange = e => onUpdateBookShelf(id, e.target.value);   
   
   return <li>
      <div className="book">
         <div className="book-top">
            <div 
               className="book-cover" 
               style={{ 
                  width: 128, 
                  height: 193, 
                  backgroundImage: `url("${thumbnailUrl}")` 
               }}
            ></div>
            <div className="book-shelf-changer">
               <select value={shelf} onChange={handleChange}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
               </select>
            </div>
         </div>
         <div className="book-title">{title}</div>
         <div className="book-authors">{authors.join(' & ')}</div>
      </div>
   </li>
}


Book.propTypes = {
   id: PropTypes.string.isRequired,
   title: PropTypes.string.isRequired,
   thumbnailUrl: PropTypes.string.isRequired,
   authors: PropTypes.array.isRequired,
   shelf: PropTypes.string.isRequired,
   onUpdateBookShelf: PropTypes.func.isRequired
}


export default Book;