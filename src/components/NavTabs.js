import React from 'react';
import { NavLink } from 'react-router-dom';
import '../pages/HomePage.css';
import { getCurrentToken } from '../useListToken';

const NavTabs = () => {
  return (
    <div className="container-container">
      <div className="container">
        <NavLink className="left-tab" to="/add-item">
          to add item
        </NavLink>

        <NavLink className="right-tab" to={`/list/${getCurrentToken()}`}>
          to list
        </NavLink>
      </div>
    </div>
  );
};

export default NavTabs;
