import { applyMiddleware, createStore } from 'redux';
import { promiseMiddleware } from '../middleware';
import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(promiseMiddleware));

export default store;