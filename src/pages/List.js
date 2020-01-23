import React, { useContext } from 'react';
import NavTabs from '../components/NavTabs';
import HomePageButton from '../components/HomePageButton';
import { ListContext } from '../listContext';
import { TokenContext } from '../tokenContext';

const List = props => {
  const { token } = useContext(TokenContext);
  const { displayList } = useContext(ListContext);

  return (
    <>
      {props.showBackButton && <HomePageButton />}
      {displayList(token)}
      <NavTabs />
    </>
  );
};

export default List;
