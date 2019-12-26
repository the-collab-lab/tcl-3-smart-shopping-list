import React from 'react';
import getToken from '../helpers/token';
import { Link } from 'react-router-dom';

const NewList = () => {
  return (
    <>
      <h2>{getToken()}</h2>
      <Link to="/">Go Home</Link>
    </>
  );
};

export default NewList;
