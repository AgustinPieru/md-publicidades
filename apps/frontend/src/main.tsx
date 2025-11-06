import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

const theme = createTheme({
  typography: {
    fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif',
    },
    h2: {
      fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif',
    },
    h3: {
      fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif',
    },
    h4: {
      fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif',
    },
    h5: {
      fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif',
    },
    h6: {
      fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif',
    },
    body1: {
      fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif',
    },
    body2: {
      fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif',
    },
    button: {
      fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif',
    },
    subtitle1: {
      fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif',
    },
    subtitle2: {
      fontFamily: '"Nunito Sans", "Helvetica", "Arial", sans-serif',
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#000000', // negro
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#a0195b', // color de detalle
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff', // blanco
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#6b7280', // gris
    },
    divider: '#e5e7eb',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);


