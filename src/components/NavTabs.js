import React from 'react';
import { NavLink } from 'react-router-dom';
import '../pages/HomePage.css';
import { Menu } from 'semantic-ui-react';

const NavTabs = () => {
  return (
    <Menu fluid widths={2}>
      <Menu.Item as={NavLink} name="to add item" to="/add-item" />
      <Menu.Item as={NavLink} name="to list" to="/list" />
    </Menu>
  );
};

export default NavTabs;
