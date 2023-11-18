import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';

window.userName = "";
window.password = "";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Note: Use the component as JSX element */}
  </React.StrictMode>,
);

reportWebVitals();