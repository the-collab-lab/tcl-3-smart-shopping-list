import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../pages/HomePage.css';
import useListToken from '../useListToken';

const JoinList = () => {
  const { saveToken } = useListToken();
  const history = useHistory();

  const [joinToken, setJoinToken] = useState('');
  const [loading, setLoading] = useState();

  const handleChange = event => {
    setJoinToken(event.target.value);
  };

  const handleSubmit = event => {
    setLoading(true);
    event.preventDefault();
    saveToken(joinToken);
    joinToken && setLoading(false);

    return joinToken && history.push('/list');
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
      </form>
    </div>
  );
};

export default JoinList;
