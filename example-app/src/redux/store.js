import { applyMiddleware, createStore } from 'redux';
import { localStorageMiddleware, promiseMiddleware } from '../middleware';
import reducer from './reducer';
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

const historyMiddleware = routerMiddleware(history)

const store = createStore(
    reducer,
    applyMiddleware(
            promiseMiddleware,
            localStorageMiddleware,
            historyMiddleware
        )
    );

export default store;