import React from 'react';

const HiddenButton = props => {
  return (
    <button onClick={props.joinList}>Click to Join an Existing List</button>
  );
};

export default HiddenButton;
