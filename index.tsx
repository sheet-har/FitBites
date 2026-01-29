
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("FitBites: Starting application...");

window.onerror = function (msg, url, line, col, error) {
  console.error("FitBites Error:", msg, "at", url, ":", line, ":", col);
  const root = document.getElementById('root');
  if (root && !root.innerHTML) {
    root.innerHTML = `<div style="padding: 20px; color: red; font-family: sans-serif;">
      <h2>Application Error</h2>
      <p>${msg}</p>
      <p>Check console for details.</p>
    </div>`;
  }
};

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

