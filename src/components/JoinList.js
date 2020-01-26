import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../pages/HomePage.css';
import useListToken from '../useListToken';

const JoinList = () => {
  const { saveToken } = useListToken();

  const [joinToken, setJoinToken] = useState('');
  const [loading, setLoading] = useState();
  const [joinFail, setJoinFail] = useState();

  const handleChange = event => {
    setJoinToken(event.target.value);
  };

  const handleSubmit = event => {
    setLoading(true);
    event.preventDefault();
    saveToken(joinToken);
    joinToken && setLoading(false);
    if (joinToken && !loading) {
      setJoinFail(true);
    }
    return joinToken && <Redirect to="/list" />;
  };

  // token to use: jimmy torn jolt, conner oaken liz

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-flex-container">
        <label htmlFor="join-list-input">
          Need to join a list? Enter your share code below, then tap "Grab Your
          List"
        </label>

        <input
          className="token-input"
          name="join-list-input"
          placeholder="Enter share code here"
          type="text"
          onChange={handleChange}
        />

        <button type="submit" className="cta-button">
          Grab Your List
        </button>
        {loading && <p>Fetching your list...</p>}
        {joinToken && joinFail && (
          <p>That list doesn't exist. Please try again</p>
        )}
      </form>
    </div>
  );
};

export default JoinList;
