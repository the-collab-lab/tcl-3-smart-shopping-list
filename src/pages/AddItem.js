import React, { useState, useContext } from 'react';
import { withFirestore } from 'react-firestore';
import AddItemHeader from './AddItemHeader';
import './AddItem.css';
import normalizeName from '../lib/normalizeName';
import ItemError from './ItemError';
import { ListContext } from '../listContext';

const expectedPurchase = { soon: 7, kindOfSoon: 14, notSoon: 30 };

const AddItem = ({ firestore }) => {};
// Wrap this component in the higher order component withFirestore to directly access the database
export default withFirestore(AddItem);
