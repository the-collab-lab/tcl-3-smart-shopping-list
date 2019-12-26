import React from 'react';
import getToken from '../helpers/token';

const NewList = () => {
  return (
    <>
      <h2>{getToken()}</h2>
    </>
  );
};

export default NewList;
