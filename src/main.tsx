import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { AUTH_CONFIG } from './config/auth0-config';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={AUTH_CONFIG.domain}
        clientId={AUTH_CONFIG.clientId}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
        cacheLocation="localstorage"
        useRefreshTokens={true}
      >
        <Router>
          <App />
        </Router>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);
