import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// if('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('./serviceWorker.js')
//     .then(reg => console.log('Service worker registered', reg))
//     .catch(err => console.log(`Service worker error: ${err}`));
// }