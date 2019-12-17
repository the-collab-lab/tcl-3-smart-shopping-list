import React from 'react';
import { Link } from 'react-router-dom';

function Hello() {
  return (
    <div>
      <h2>Welcome to Collab Lab!</h2>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Hello;
