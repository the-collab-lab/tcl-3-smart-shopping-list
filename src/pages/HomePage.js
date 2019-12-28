import React from 'react';
import { NavLink } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="whole-page">
      <h1>Here's our homepage! Go to your list or add an item below.</h1>
      <div className="container-container">
        <div className="container">
          <NavLink className="left-tab" to="/add-item">
            to add item
          </NavLink>

          <NavLink className="right-tab" to="/list">
            to list
          </NavLink>
        </div>
      </div>
    </div>
  );
}
