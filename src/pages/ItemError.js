import React from 'react';
import './ItemError.css';

function ItemError(props) {
  return (
    <aside className="flash">
      <h3>Oh no! Item already exists!</h3>
    </aside>
  );
}

export default ItemError;
