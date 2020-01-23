import React from 'react';
import HomePageButton from './HomePageButton';

export default function ErrorMessage() {
  return (
    <div className="whole-page">
      <HomePageButton />
      <h1>
        List not found! Try going back to the homepage to join another list.
      </h1>
    </div>
  );
}
