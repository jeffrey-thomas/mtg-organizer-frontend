import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme';
import { Routing } from './components/Routing';
import { store } from './redux/store';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routing />
        </ThemeProvider>
      </StoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
