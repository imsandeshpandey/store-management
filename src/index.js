import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CssVarsProvider } from '@mui/joy';
import theme from 'theme/index.js';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from 'contexts/AppContext.jsx';
import { AuthProvider } from 'contexts/AuthContext.jsx';
// import { AuthProvider } from "./contexts/useAuth/Auth.context.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <AppProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </AppProvider>
    </CssVarsProvider>
  </React.StrictMode>
);
