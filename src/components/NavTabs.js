import React from 'react';
import { NavLink } from 'react-router-dom';
import '../pages/HomePage.css';
import { Menu, Icon } from 'semantic-ui-react';

const NavTabs = () => {
  return (
    <Menu fluid fixed="bottom" bottom="true" widths={2}>
      <Menu.Item as={NavLink} name="to add item" to="/add-item">
        <Icon name="add" /> Add Item
      </Menu.Item>

      <Menu.Item as={NavLink} name="to list" to="/list">
        <Icon name="list" /> Shopping List
      </Menu.Item>
    </Menu>
  );
};

export default NavTabs;
