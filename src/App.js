import React from 'react';
import AppRouter from './AppRouter';
import { Container } from 'semantic-ui-react';

function App() {
  return (
    <Container>
      <main>
        <AppRouter />
      </main>
    </Container>
  );
}

export default App;
