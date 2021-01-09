import { applyMiddleware, createStore } from 'redux';
import { promiseMiddleware } from '../middleware';

const defaultState = {
    appName: 'conduit',
    articles: null,
};

const reducer = function(state = defaultState, action){
    switch (action.type){
        case 'TOGGLE':
            return { ...state, checked: !state.checked };
        default:
            return state;
    }
};

const store = createStore(reducer, applyMiddleware(promiseMiddleware));

export default store;