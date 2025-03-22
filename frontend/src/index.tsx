// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Find the root element in your index.html
const container = document.getElementById('root');
if (!container) {
  throw new Error('Could not find root element');
}

// Create a root and render the App component
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
