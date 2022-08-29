import React from 'react';

import { createRoot } from 'react-dom/client';
import App from './App';
import registerServiceWorker from './serviceWorkerRegistration';

// set language from queryPram

const urlSearchParams = new URLSearchParams(window.location.search);
if (urlSearchParams) {
  const params = Object.fromEntries(urlSearchParams.entries());
  if (params.lang) {
    window.configLang = params.lang;
  }
}

import './i18n';
import './styles/main.scss';
import { ThemeProvider } from './contexts/theme/theme.context';

const container = document.getElementById('root');

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

registerServiceWorker();
