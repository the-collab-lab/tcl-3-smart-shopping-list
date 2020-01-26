import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentToken } from '../useListToken';

function AddItemHeader() {
  return (
    <div>
      <Link to={`/list/${getCurrentToken()}`}>
        <img src={require('../assets/back-button.png')} alt="back button" />
      </Link>
    </div>
  );
}

export default AddItemHeader;
