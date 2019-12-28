import React from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <>
      <h1>here's our homepage!</h1>
      <div className="container-container">
        <div className="container">
          <BrowserRouter>
            <NavLink activeClassName="left-tab" to="/add-item">
              to add item
            </NavLink>

            <NavLink activeClassName="right-tab" to="/">
              to list
            </NavLink>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}
