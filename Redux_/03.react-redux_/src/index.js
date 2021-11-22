import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // react + redux 합치는 거
import './index.css';
import App from './App';
import store from './store';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    {/* 다 만든 store 뿌리기 */}
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
