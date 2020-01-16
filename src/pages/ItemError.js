import React from 'react';
import './ItemError.css';

function ItemError(props) {
  return (
    <div className={'flash ' + props.className}>
      <h3>Oh no! Item already exists!</h3>
    </div>
  );
}

export default ItemError;
