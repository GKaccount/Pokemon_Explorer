// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { PokemonProvider } from './contexts/PokemonContext';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PokemonProvider>
      <Router>
        <App />
      </Router>
    </PokemonProvider>
  </React.StrictMode>
);
