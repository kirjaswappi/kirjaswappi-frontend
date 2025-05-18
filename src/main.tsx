import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Authenticate from './Authenticate.tsx';
import './index.css';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Authenticate />
    </Provider>
  </React.StrictMode>,
);
