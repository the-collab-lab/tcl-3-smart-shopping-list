import React from 'react';
import { Link } from 'react-router-dom';

function HomePageButton() {
  return (
    <div>
      <Link to="/">
        <img src={require('../assets/back-button.png')} alt="back button" />
      </Link>
      Back to Home Page
    </div>
  );
}

export default HomePageButton;
