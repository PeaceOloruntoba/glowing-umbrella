import React from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import { ModalsProvider } from '@mantine/modals';
import { store } from './redux/store';
import App from './App.tsx';
import './index.css';

const theme = createTheme({
  colors: {
    primary: [
      '#f0f9ff',
      '#e0f2fe',
      '#bae6fd',
      '#7dd3fc',
      '#38bdf8',
      '#0ea5e9',
      '#0284c7',
      '#0369a1',
      '#075985',
      '#0c4a6e',
    ],
  },
  primaryColor: 'primary',
});

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <ModalsProvider>
          <Notifications />
          <App />
        </ModalsProvider>
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
);
