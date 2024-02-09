import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter} from 'react-router-dom';
import App from "./App";
import "./App.scss";
import 'bulma/css/bulma.css';

createRoot(document.getElementById('app'))
  .render(
    <HashRouter>
      <App />
    </HashRouter>
  );