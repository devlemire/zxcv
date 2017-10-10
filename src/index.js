import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker, { unregister } from './registerServiceWorker';

import { Provider } from 'react-redux';
import store from './store';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, 
document.getElementById('root'));

if ( process.env.NODE_ENV === 'development' ) {
  console.log('Development mode active, registering service worker.');
  registerServiceWorker();
} else {
  console.log('No longer in development, unregistering service worker.');
  unregister();
}

