import React from 'react';
import './ItemError.css';

function ItemError(props) {
  return (
    <aside className="flash" role="alert">
      <h3>{props.name} is already on the list.</h3>
    </aside>
  );
}

export default ItemError;
