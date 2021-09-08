/** 
 * @description display a prompt on the screen
 * @param {string} message - message to display
*/


import React from 'react';
import PropTypes from 'prop-types';


const Prompt = ({ message }) => {
   return <div className="prompt">
      <p className="prompt-message">{message}</p>
   </div>
}


Prompt.propTypes = {
   message: PropTypes.string.isRequired,
}


export default Prompt;