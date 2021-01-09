import { createStore } from 'redux';

const defaultState = {checked: false};

const reducer = function(state = defaultState, action){
    switch (action.type){
        case 'TOGGLE':
            return { ...state, checked: !state.checked };
    }
};

const store = createStore(reducer);

export default store;