import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes } from 'react-router-dom';
import { appRoutes } from './routes.jsx';
import { ROUTER_FUTURE } from './routerFuture.js';
import './styles/tokens.css';
import './styles/base.css';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename} future={ROUTER_FUTURE}>
      <Routes>{appRoutes}</Routes>
    </BrowserRouter>
  </StrictMode>,
);
