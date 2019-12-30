import React from 'react';
import { FirestoreCollection } from 'react-firestore';

import AddItem from 'components/AddItem';

export default function ShoppingList({ token }) {
  return (
    <FirestoreCollection path={token}>
      {({ isLoading, data }) =>
        isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ul>
              {data.map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
            <AddItem token={token} />
          </>
        )
      }
    </FirestoreCollection>
  );
}
