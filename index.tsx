
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Changed from './App'

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// AIzaSyC61M4ur5FjTVQZwYf3OU2oDk_-4l2_kLc