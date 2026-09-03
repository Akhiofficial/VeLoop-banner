import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Bootstrap responsive utilities
import 'bootstrap/dist/css/bootstrap.min.css';

// Project global variables & base styles
import './styles/globals.css';

// index.css is kept for any Vite-default base styles
import './index.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
