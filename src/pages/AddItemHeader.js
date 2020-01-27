import React from 'react';
import { Link } from 'react-router-dom';

function AddItemHeader() {
  return (
    <div>
      <Link to={`/list/`}>
        <img src={require('../assets/back-button.png')} alt="back button" />
      </Link>
    </div>
  );
}

export default AddItemHeader;
