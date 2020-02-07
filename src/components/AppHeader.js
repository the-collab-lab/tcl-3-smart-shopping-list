import React from 'react';
import { Image, Header } from 'semantic-ui-react';
import Logo from '../assets/logo.png';

export default function AppHeader(props) {
  return (
    <header>
      <Image src={Logo} centered size="small" alt="Shopping List" />
      <Header as="h1" textAlign="center">
        <Header.Content>{props.children}</Header.Content>
      </Header>
    </header>
  );
}
