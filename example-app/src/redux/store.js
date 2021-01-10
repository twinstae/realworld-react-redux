import { applyMiddleware, createStore } from 'redux';
import { localStorageMiddleware, promiseMiddleware } from '../middleware';
import reducer from './reducer';

const store = createStore(
    reducer,
    applyMiddleware(
            promiseMiddleware,
            localStorageMiddleware
        )
    );

export default store;