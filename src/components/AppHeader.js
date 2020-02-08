import React from 'react';
import { Header, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function AppHeader(props) {
  return (
    <Segment textAlign="center" style={{ borderRadius: 0 }}>
      {props.showBackArrow && (
        <>
          <Button
            style={{ marginRight: '-37.5px' }}
            basic
            as={Link}
            to="/"
            icon="arrow left"
            size="medium"
            color="blue"
            circular
            floated="left"
          ></Button>
          {/* <Divider hidden /> */}
        </>
      )}

      <header>
        {/* <Image
          src={Logo}
          centered
          size="tiny"
          verticalAlign="middle"
          alt="Shopping List"
        /> */}
        <Header as="h1">
          <Header.Content>{props.children}</Header.Content>
        </Header>
      </header>
    </Segment>
  );
}
AppHeader.defaultProps = {
  showBackArrow: false,
};
export default AppHeader;
