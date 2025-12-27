import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { HelmetProvider } from 'react-helmet-async';
import {
  RouterProvider
} from "react-router";
import router from './routes/sections/index.tsx';

import { store } from '../src/redux/store.ts'
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </Provider>

  </StrictMode>,
)
