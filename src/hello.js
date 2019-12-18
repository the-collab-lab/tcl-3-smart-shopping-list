import React from 'react';
import { Link } from 'react-router-dom';

function Hello() {
  return (
    <div>
      <Link to="/hello-again">Click here to be welcome</Link>
    </div>
  );
}

export default Hello;
