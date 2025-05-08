import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import React from 'react';
import './index.css'; // or './styles.css', wherever Tailwind is configured

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
