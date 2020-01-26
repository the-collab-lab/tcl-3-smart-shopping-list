import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/HomePage.css';
import useListToken, { getCurrentToken } from '../useListToken';

const JoinList = () => {
  const { saveToken } = useListToken();

   const [joinToken, setJoinToken] = useState('');

   const handleChange = event => {
     setJoinToken(event.target.value)
   }
   
   const handleSubmit = event => {
     event.preventDefault();
     saveToken(joinToken)
   }
    saveToken(event.target.value);
  };

  // token to use: jimmy torn jolt, conner oaken liz

  const handleSubmit = event => {
    saveToken(getCurrentToken());
    event.preventDefault();
  };

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

        <Link to="/list">
          <button type="submit" className="cta-button">
            Grab Your List
          </button>
        </Link>
      </form>
    </div>
  );
};

export default JoinList;
