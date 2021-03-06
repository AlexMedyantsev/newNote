import React from "react";
import ReactDOM from "react-dom";
import reducer from "./reducer/reducer.js";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from 'redux';
import {throttle} from "lodash";
import thunk from 'redux-thunk';
import {createAPI} from "./api.js";
import {loadState, saveState} from "./reducer/local-storage.js";
import App from "./components/app/app.jsx"

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true, traceLimit: 25}) || compose;

const store = createStore(
  reducer,
  persistedState,
  composeEnhancers(
    applyMiddleware(thunk),
  )
);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

ReactDOM.render(
  <Provider store={store} basename={process.env.PUBLIC_URL}>
    <App/>
  </Provider>,
  document.querySelector(`#root`)
);

