import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { HelmetProvider } from 'react-helmet-async';
import {
  RouterProvider
} from "react-router";
import router from './sections/router.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
)
