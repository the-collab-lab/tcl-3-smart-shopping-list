import React from 'react';
import AppRouter from './AppRouter';
import AppHeader from './components/AppHeader';
import './App.css';

function App() {
  return (
    <main>
      <AppHeader></AppHeader>
      <AppRouter />
    </main>
  );
}

export default App;
