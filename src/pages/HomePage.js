import React from 'react';
import { NavLink } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <>
      <h1>here's our homepage!</h1>
      <div className="container-container">
        <div className="container">
          <NavLink activeClassName="left-tab" to="/add-item">
            to add item
          </NavLink>

          <NavLink activeClassName="right-tab" to="/">
            to list
          </NavLink>
        </div>
      </div>
    </>
  );
}
