import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux';
import article from './reducers/article';
import articleList from './reducers/articleList';
import common from './reducers/common';

export default combineReducers({
    articleList,
    article,
    common,
    router: routerReducer
})