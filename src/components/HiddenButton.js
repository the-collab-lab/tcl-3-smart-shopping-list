// // import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../pages/HomePage.css';

// const hiddenButton = () => {
//   const [hiddenThing, setHiddenThing] = useState(true);
//   return (
//     <div>
//         <button>click to join list</button>
//     </div>
//   )
// };
// export default hiddenButton;

// I commented out this code at the top because I would not be able to push any of it to my branch if I didn't.

// All of the code in this bottom section is commented out, also. These are the last changes that I made prior to using Stacie's suggestion above.

// //  const hideButton
// // const setHideButton
// const hiddenButtons = () => {
//   const [hideButton, setHideButton] = useState ("");  return
//   (<div>
//     <button onClick={() => setHideButton(true)}>Click here to use an existing token</button>
//       {/* {hiddenButton && 'token'}  */}
//     </div>)// const hiddenButtons = () => {[hideButton, setHideButton] = useState (false)
// //       return (<div>
// //         <button onClick={() => setHideButton(true)}>Click here to use an existing token</button>
// //         {/* {hiddenButton && 'token'} */}
// //         </div>)
//   };
//   export default hiddenButtons;

// import React, { useState } from 'react';

// import JoinList from './JoinList';

// const HiddenButton = (props)=>{
//     const [isJoinListShown, setJoinListShown] = useState(false);

//     handleClick=(e)=>{
//         e.preventDefault();
//         setJoinListShown(true); // Here we change state
//     }

//     return(
//        <div>
//         {props.render&&
//             <button onClick={props.handleClick}>Click To Join List</button>
//         }
//         {isJoinListShown && <JoinList />}
//        </div>
//     )
// }
// export default HiddenButton

import React from 'react';

const HiddenButton = props => {
  return (
    <button onClick={props.joinList}>Click to Join an Existing List</button>
  );
};

export default HiddenButton;
