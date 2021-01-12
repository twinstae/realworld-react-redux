import { applyMiddleware, createStore } from 'redux';
import { localStorageMiddleware, promiseMiddleware } from '../middleware';
import reducer from './reducer';
import { routerMiddleware } from 'react-router-redux'
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
const myRouterMiddleware = routerMiddleware(history);

const store = createStore(
    reducer,
    applyMiddleware(
            myRouterMiddleware,
            promiseMiddleware,
            localStorageMiddleware
        )
    );

export default store;