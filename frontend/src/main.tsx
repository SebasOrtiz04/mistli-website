import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import './i18n.ts';
import {
  RouterProvider
} from "react-router-dom";
import router from './routes/sections/index.tsx';

import { store } from './redux/store.ts'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>

  </StrictMode>,
)
