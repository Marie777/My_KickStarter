import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './App';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.getElementById('root'));


  // import React from 'react';
  // import ReactDOM from 'react-dom';
  // import { createStore, applyMiddleware } from 'redux';
  // import './index.css';
  // import App from './App';
  // import registerServiceWorker from './registerServiceWorker';
  // import reducers from './reducers';
  //
  // const createStoreMiddleware = applyMiddleware()(createStore);
  //
  // ReactDOM.render(
  //   <Provider store={createStoreMiddleware(reducers)}>
  //     <App />
  //   </Provider>
  //   , document.getElementById('root')
  // );
  //
  // registerServiceWorker();
