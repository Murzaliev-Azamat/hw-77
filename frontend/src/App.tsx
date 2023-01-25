import React from 'react';
import './App.css';
import MessagesForm from './features/messages/MessagesForm';
import { Container } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm" sx={{mt: 2}} >
        <MessagesForm/>
      </Container>
    </div>
  );
}

export default App;
