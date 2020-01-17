import React from 'react';
import './HomePage.css';
import NavTabs from '../components/NavTabs';
import JoinList from '../components/JoinList';
import HiddenButton from '../components/HiddenButton';

export default function HomePage() {
  return (
    <div className="whole-page">
      <h1>Here's our homepage! Go to your list or add an item below.</h1>

      <JoinList />
      <NavTabs />
      <HiddenButton />
    </div>
  );
}
