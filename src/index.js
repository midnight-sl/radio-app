import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import RadioContextProvider from './containers/RadioContext';

import './styles/App.css'

ReactDOM.render(
  <RadioContextProvider>
    <App />
  </RadioContextProvider>,
  document.getElementById("root")
);