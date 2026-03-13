import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';

let basename = window.location.pathname;
const rootElement = document.getElementById("root");
if (rootElement?.dataset.baseurl) {
    basename = rootElement.dataset.baseurl;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Router basename={basename}>
        <App />
      </Router>
  </React.StrictMode>,
)
