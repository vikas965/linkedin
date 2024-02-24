import React, { useState } from 'react';

const TextComponent = ({ text = '', maxLength }) => {
  const [showFullText, setShowFullText] = useState(false);

  if (typeof text !== 'string') {
    console.error("The 'text' prop must be a string.");
    return null; // or return an error message
  }

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className='desc'>
      <p className='postdesc'>
        {showFullText ? text : `${text.slice(0, maxLength)}...`}
        {!showFullText && text.length > maxLength && (
          <span onClick={toggleText} style={{ color: 'black', cursor: 'pointer',textAlign:"justify" }}>
            See more
          </span>
        )}
      </p>
    </div>
  );
};

export default TextComponent;
