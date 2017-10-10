import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker, { unregister } from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

if ( process.env.NODE_ENV === 'development' ) {
  console.log('Development mode active, registering service worker.');
  registerServiceWorker();
} else {
  console.log('No longer in development, unregistering service worker.');
  unregister();
}

