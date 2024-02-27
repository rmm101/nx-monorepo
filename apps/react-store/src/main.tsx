import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './styles.css';
import App from './components/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
