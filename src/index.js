import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './providers/UserContext';
import { history } from "./helpers/history";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <UserProvider>
    <BrowserRouter history={history}>
        <App/>
    </BrowserRouter>
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
