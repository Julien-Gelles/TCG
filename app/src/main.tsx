import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { CssBaseline } from '@mui/material';
import { queryClient } from './api/client/queryClient.ts';
import { GlobalStyle } from "./styles/Main.css.ts";

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <GlobalStyle />
      <App />
      <Toaster position="top-right" />
    </QueryClientProvider>
  </StrictMode>,
);
