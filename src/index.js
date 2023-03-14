import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, configureStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

const  logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching action=',action);
            const result = next(action);
            console.log('[Middleware] Dispatching next state=',store.getState());
            return result;
        }
    }
};

const middleware = [logger, thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

// old deprecated creteStore
//const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

const store = configureStore({
    reducer: rootReducer,
    middleware: middleware,
    devTools: true
  });

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
