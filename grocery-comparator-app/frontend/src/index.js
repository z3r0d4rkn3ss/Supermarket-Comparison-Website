import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css'; // Import the styles
import App from './App'; // Import the main App component

const root = ReactDOM.createRoot(document.getElementById('root')); // Get the root div from index.html
root.render(
  <React.StrictMode>
    <App />  {/* Render the App component */}
  </React.StrictMode>
);
