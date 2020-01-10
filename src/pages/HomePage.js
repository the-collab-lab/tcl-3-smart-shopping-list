import React, { useEffect, useState } from 'react';
import './HomePage.css';
import NavTabs from '../components/NavTabs';

export default function HomePage() {
  const [userJoinToken, setUserJoinToken] = useState('');

  const getJoinToken = () => window.localStorage.getItem('joinToken');
  const [joinToken] = useState(getJoinToken);
  // const [joinToken] = useState('');

  // useEffect(() =>  {
  //   window.localStorage.setItem('joinToken', userJoinToken);
  //   },[userJoinToken]
  // );
  console.log('the join token below useEffect:', joinToken);
  const handleChange = event => {
    setUserJoinToken(event.target.value);
  };

  // token to use:  low stone iambic
  const handleSubmit = event => {
    event.preventDefault();
    window.localStorage.setItem('joinToken', userJoinToken);
    console.log('the join token inside of console.log:', userJoinToken);
    setUserJoinToken('');
  };

  return (
    <div className="whole-page">
      <h1>Here's our homepage! Go to your list or add an item below.</h1>
      <form onSubmit={handleSubmit}>
        <label>Need to join a list?</label>

        <input
          value={userJoinToken}
          placeholder="Add token here"
          type="text"
          onChange={handleChange}
        />

        <input type="submit" value="Grab Your List" />
      </form>
      <NavTabs />
    </div>
  );
}
