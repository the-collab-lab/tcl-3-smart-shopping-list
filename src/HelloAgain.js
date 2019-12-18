import React from 'react';
import { Link } from 'react-router-dom';

function HelloAgain() {
  return (
    <div>
      <h2>Welcome to Collab Lab! This is a new page</h2>
      <Link to="/">Go back home</Link>
    </div>
  );
}

export default HelloAgain;
